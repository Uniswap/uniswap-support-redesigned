import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { formatDistance, format } from 'date-fns';
import type { RedirectRule, RedirectRuleInput, RedirectRuleFilters, PaginatedResponse } from '../lib/api';
import { getRedirectRules, createRedirectRule, deleteRedirectRule, getZendeskConfig, saveZendeskConfig, clearZendeskConfig } from '../lib/api';
import type { ZendeskConfig } from './ConfigDialog';
import { ConfigDialog } from './ConfigDialog';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function RedirectManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [useServerFilter, setUseServerFilter] = useState(true);
  const [zendeskConfig, setZendeskConfig] = useState<ZendeskConfig | null>(null);
  const [filters, setFilters] = useState<RedirectRuleFilters>({
    search: '',
    per_page: 25,
    sort: '-id' // Default sort by id in descending order (newest first)
  });
  const [newRule, setNewRule] = useState<RedirectRuleInput>({
    redirect_from: '',
    redirect_to: '',
    redirect_status: '301'
  });

  // Load config from localStorage on mount
  useEffect(() => {
    const config = getZendeskConfig();
    setZendeskConfig(config);
    
    // If no config is found, open the config dialog
    if (!config) {
      setIsConfigOpen(true);
    }
  }, []);

  // Save config to localStorage
  const handleSaveConfig = (config: ZendeskConfig) => {
    saveZendeskConfig(config);
    setZendeskConfig(config);
    // Refetch data with new config
    refetch();
    toast.success("Zendesk configuration saved");
  };

  // Handle clearing Zendesk config
  const handleClearConfig = () => {
    clearZendeskConfig();
    setZendeskConfig(null);
    toast.success("Zendesk configuration cleared");
  };

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update filters when debounced search term changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: useServerFilter ? debouncedSearchTerm : '',
      cursor: undefined // Reset cursor when search changes
    }));
  }, [debouncedSearchTerm, useServerFilter]);

  const queryClient = useQueryClient();

  // Query for fetching redirect rules
  const { 
    data, 
    isLoading, 
    error: queryError,
    refetch 
  } = useQuery({
    queryKey: ['redirectRules', filters],
    queryFn: () => getRedirectRules(filters),
    initialData: { data: [], meta: { hasMore: false } } as PaginatedResponse<RedirectRule>,
    // Don't run the query if no config is set
    enabled: !!zendeskConfig
  });

  // Client-side filtering if server filtering fails
  const filteredRules = debouncedSearchTerm && !useServerFilter
    ? data.data.filter(rule => rule.redirect_from.includes(debouncedSearchTerm))
    : data.data;

  // Ensure rules is always an array
  const rules = filteredRules || [];
  const hasNextPage = data.meta.hasMore;
  const nextCursor = data.meta.nextCursor;
  const prevCursor = data.meta.prevCursor;

  // If we get an error with server filtering, try client filtering
  useEffect(() => {
    if (queryError && debouncedSearchTerm) {
      setUseServerFilter(false);
      setError("Server filtering failed. Using client-side filtering instead.");
      toast.error("API filtering failed. Switched to client-side filtering.");
    }
  }, [queryError, debouncedSearchTerm]);

  // Display error message
  useEffect(() => {
    if (queryError instanceof Error) {
      setError(queryError.message);
      
      // If the error is about missing config, open the config dialog
      if (queryError.message.includes('configuration not found')) {
        setIsConfigOpen(true);
        toast.error("Please configure your Zendesk API settings");
      } else {
        toast.error(`API Error: ${queryError.message}`);
      }
    }
  }, [queryError]);

  // Mutation for creating a new rule
  const createMutation = useMutation({
    mutationFn: createRedirectRule,
    onSuccess: () => {
      // Invalidate and refetch the redirect rules query
      queryClient.invalidateQueries({ queryKey: ['redirectRules'] });
      // Explicitly refetch to ensure we have the latest data
      refetch();
      setIsDialogOpen(false);
      resetForm();
      toast.success("Redirect rule created successfully");
    },
    onError: (err: Error) => {
      setError(err.message);
      toast.error(`Failed to create redirect rule: ${err.message}`);
    }
  });

  // Mutation for deleting a rule
  const deleteMutation = useMutation({
    mutationFn: deleteRedirectRule,
    onSuccess: () => {
      // Invalidate and refetch the redirect rules query
      queryClient.invalidateQueries({ queryKey: ['redirectRules'] });
      // Explicitly refetch to ensure we have the latest data
      refetch();
      toast.success("Redirect rule deleted successfully");
    },
    onError: (err: Error) => {
      setError(err.message);
      toast.error(`Failed to delete redirect rule: ${err.message}`);
    }
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRule(prev => ({ ...prev, [name]: value }));
  };

  // Reset form after submission
  const resetForm = () => {
    setNewRule({
      redirect_from: '',
      redirect_to: '',
      redirect_status: '301'
    });
    setError(null);
  };

  // Set validation error
  const setValidationError = (message: string) => {
    setError(message);
    // Don't show toast for validation errors as they're shown in the form
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Simple validation
    if (!newRule.redirect_from || !newRule.redirect_to) {
      setValidationError('All fields are required');
      return;
    }
    
    if (!newRule.redirect_from.startsWith('/')) {
      setValidationError('Path must start with "/"');
      return;
    }
    
    if (
      !newRule.redirect_to.startsWith('/') && 
      !newRule.redirect_to.startsWith('http://') && 
      !newRule.redirect_to.startsWith('https://')
    ) {
      setValidationError('Target URL must start with "/", "http://" or "https://"');
      return;
    }
    
    createMutation.mutate(newRule);
  };

  // Reset search
  const handleResetSearch = () => {
    setSearchTerm('');
  };

  // Handle pagination
  const handleNextPage = () => {
    if (nextCursor) {
      setFilters(prev => ({
        ...prev,
        cursor: nextCursor
      }));
    }
  };

  const handlePrevPage = () => {
    if (prevCursor) {
      setFilters(prev => ({
        ...prev,
        cursor: prevCursor
      }));
    }
  };

  // Copy text to clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard`);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      sort: e.target.value
    }));
  };

  // Handle visiting a URL (handles both absolute and relative URLs)
  const handleVisitUrl = (url: string) => {
    // If the URL is relative (starts with /), prepend the Zendesk subdomain
    if (url.startsWith('/') && zendeskConfig) {
      // Extract the base domain from the subdomain
      // e.g., from https://example.zendesk.com to example.zendesk.com
      const domainMatch = zendeskConfig.subdomain.match(/^https?:\/\/([^\/]+)/);
      const baseDomain = domainMatch ? domainMatch[1] : '';
      
      if (baseDomain) {
        window.open(`https://${baseDomain}${url}`, '_blank');
        return;
      }
    }
    
    // For absolute URLs or if we couldn't extract the base domain
    window.open(url, '_blank');
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Zendesk Redirect Manager</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsConfigOpen(true)}
              title="Configure Zendesk API settings"
            >
              Settings
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>Add New Redirect</Button>
          </div>
        </div>

        {/* API Configuration message */}
        {!zendeskConfig && (
          <Alert className="mb-6">
            <AlertDescription>
              Please configure your Zendesk API settings to use this application.
            </AlertDescription>
          </Alert>
        )}

        {/* Search and filter section */}
        <div className="mb-6 space-y-4">
          {/* Search input */}
          <div className="relative">
            <Input
              className="pr-10"
              placeholder="Search by path prefix (e.g. /articles/)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={handleResetSearch}
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Filters and sorting row */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            {/* Search feedback */}
            <div>
              {debouncedSearchTerm && (
                <p className="text-sm text-muted-foreground">
                  Showing paths starting with: <span className="font-medium">{debouncedSearchTerm}</span>
                </p>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Sort dropdown */}
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm whitespace-nowrap">Sort by:</label>
                <select
                  id="sort"
                  value={filters.sort}
                  onChange={handleSortChange}
                  className="h-9 px-2 py-1 rounded-md border text-sm"
                >
                  <option value="-id">Newest first</option>
                  <option value="id">Oldest first</option>
                  <option value="redirect_from">Path (A-Z)</option>
                  <option value="-redirect_from">Path (Z-A)</option>
                </select>
              </div>
              
              {/* Filter toggle */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setUseServerFilter(!useServerFilter)}
                className="text-xs"
              >
                {useServerFilter ? 'Using API filtering' : 'Using client filtering'}
              </Button>
            </div>
          </div>
        </div>

        {/* Rules table */}
        <div className="border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Path</TableHead>
                  <TableHead className="w-[35%]">Target URL</TableHead>
                  <TableHead className="w-[7%]">Status</TableHead>
                  <TableHead className="w-[11%]">Created</TableHead>
                  <TableHead className="w-[11%]">Updated</TableHead>
                  <TableHead className="w-[11%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : rules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      {debouncedSearchTerm 
                        ? `No redirect rules found with paths starting with "${debouncedSearchTerm}"` 
                        : 'No redirect rules found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="max-w-[250px]">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className="truncate font-mono cursor-pointer group flex items-center" 
                              onClick={() => handleCopy(rule.redirect_from, 'path')}
                            >
                              {rule.redirect_from}
                              <span className="ml-2 opacity-0 group-hover:opacity-70 transition-opacity">
                                📋
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" align="start" className="font-mono">
                            <p>{rule.redirect_from}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="max-w-[250px]">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className="truncate font-mono cursor-pointer group flex items-center" 
                              onClick={() => handleCopy(rule.redirect_to, 'target URL')}
                            >
                              {rule.redirect_to}
                              <span className="ml-2 opacity-0 group-hover:opacity-70 transition-opacity">
                                📋
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" align="start" className="font-mono">
                            <p>{rule.redirect_to}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{rule.redirect_status}</TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-default">
                              {formatDistance(new Date(rule.created_at), new Date(), { addSuffix: true })}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" align="center">
                            <p>{format(new Date(rule.created_at), 'PPpp')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-default">
                              {formatDistance(new Date(rule.updated_at), new Date(), { addSuffix: true })}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" align="center">
                            <p>{format(new Date(rule.updated_at), 'PPpp')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleVisitUrl(rule.redirect_to)}
                            title="Open target URL in new tab"
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border-blue-200"
                          >
                            Visit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteMutation.mutate(rule.id)}
                            disabled={deleteMutation.isPending}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Pagination controls */}
        {(prevCursor || nextCursor) && (
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={handlePrevPage} 
              disabled={!prevCursor}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              onClick={handleNextPage} 
              disabled={!hasNextPage || !nextCursor}
            >
              Next
            </Button>
          </div>
        )}

        {/* Add new redirect dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Redirect Rule</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <label htmlFor="redirect_from" className="text-sm font-medium">
                  Path (must start with /)
                </label>
                <Input
                  id="redirect_from"
                  name="redirect_from"
                  value={newRule.redirect_from}
                  onChange={handleInputChange}
                  placeholder="/old-page"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="redirect_to" className="text-sm font-medium">
                  Target URL (path or full URL)
                </label>
                <Input
                  id="redirect_to"
                  name="redirect_to"
                  value={newRule.redirect_to}
                  onChange={handleInputChange}
                  placeholder="/new-page or https://example.com/page"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="redirect_status" className="text-sm font-medium">
                  HTTP Status Code
                </label>
                <select
                  id="redirect_status"
                  name="redirect_status"
                  value={newRule.redirect_status}
                  onChange={(e) => setNewRule(prev => ({ ...prev, redirect_status: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="301">301 - Permanent Redirect</option>
                  <option value="302">302 - Temporary Redirect</option>
                  <option value="307">307 - Temporary Redirect (preserves method)</option>
                  <option value="308">308 - Permanent Redirect (preserves method)</option>
                </select>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? 'Saving...' : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Zendesk configuration dialog */}
        <ConfigDialog
          open={isConfigOpen}
          onOpenChange={setIsConfigOpen}
          onSave={handleSaveConfig}
          onClear={handleClearConfig}
          defaultConfig={zendeskConfig || undefined}
        />
      </div>
    </TooltipProvider>
  );
} 