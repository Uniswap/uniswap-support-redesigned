import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";

export interface ZendeskConfig {
  subdomain: string;
  email: string;
  apiToken: string;
}

interface ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (config: ZendeskConfig) => void;
  onClear?: () => void;
  defaultConfig?: ZendeskConfig;
}

export function ConfigDialog({ open, onOpenChange, onSave, onClear, defaultConfig }: ConfigDialogProps) {
  const [config, setConfig] = useState<ZendeskConfig>(() => {
    return defaultConfig || {
      subdomain: '',
      email: '',
      apiToken: ''
    };
  });
  const [error, setError] = useState<string | null>(null);
  const [clearConfirm, setClearConfirm] = useState(false);

  // Update form when default config changes
  useEffect(() => {
    if (defaultConfig) {
      setConfig(defaultConfig);
    }
  }, [defaultConfig]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (!config.subdomain || !config.email || !config.apiToken) {
      setError('All fields are required');
      return;
    }

    // Validate subdomain format
    if (!config.subdomain.startsWith('https://')) {
      setConfig(prev => ({
        ...prev,
        subdomain: `https://${prev.subdomain.replace(/^https?:\/\//, '')}`
      }));
    }

    // Remove trailing slashes from subdomain
    const cleanedSubdomain = config.subdomain.replace(/\/+$/, '');
    const finalConfig = { ...config, subdomain: cleanedSubdomain };

    // Save the config
    onSave(finalConfig);
    onOpenChange(false);
    setClearConfirm(false);
  };

  const handleClearConfig = () => {
    if (clearConfirm) {
      // Clear the config
      if (onClear) {
        onClear();
      }
      // Reset form
      setConfig({
        subdomain: '',
        email: '',
        apiToken: ''
      });
      setClearConfirm(false);
    } else {
      // Show confirmation
      setClearConfirm(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Reset clear confirmation state when dialog is closed
      if (!newOpen) {
        setClearConfirm(false);
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Zendesk API Configuration</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {clearConfirm && (
            <Alert className="bg-amber-50 text-amber-700 border-amber-200">
              <AlertDescription>
                Are you sure you want to clear all settings? This cannot be undone.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label htmlFor="subdomain" className="text-sm font-medium">
              Zendesk Subdomain
            </label>
            <Input
              id="subdomain"
              name="subdomain"
              value={config.subdomain}
              onChange={handleInputChange}
              placeholder="https://your-subdomain.zendesk.com"
            />
            <p className="text-xs text-muted-foreground">
              The URL of your Zendesk account, e.g. https://example.zendesk.com
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Zendesk Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={config.email}
              onChange={handleInputChange}
              placeholder="your-email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="apiToken" className="text-sm font-medium">
              Zendesk API Token
            </label>
            <Input
              id="apiToken"
              name="apiToken"
              type="password"
              value={config.apiToken}
              onChange={handleInputChange}
              placeholder="Your API token"
            />
            <p className="text-xs text-muted-foreground">
              Find or generate your API token in your Zendesk admin settings under API
            </p>
          </div>

          <DialogFooter className="pt-4 flex items-center justify-between sm:justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClearConfig}
              className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
            >
              {clearConfirm ? 'Confirm Clear' : 'Clear Settings'}
            </Button>
            <Button type="submit">Save Configuration</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 