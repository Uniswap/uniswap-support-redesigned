import type { ZendeskConfig } from '../components/ConfigDialog';

// Types
export interface RedirectRule {
  id: string;
  redirect_from: string;
  redirect_to: string;
  redirect_status: string;
  created_at: string;
  updated_at: string;
  brand_id: string;
}

export interface RedirectRuleInput {
  redirect_from: string;
  redirect_to: string;
  redirect_status: string;
}

export interface RedirectRuleFilters {
  search?: string;
  cursor?: string;
  per_page?: number;
  sort?: string; // Sorting parameter, e.g. "-created_at" for descending order
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    hasMore: boolean;
    nextCursor?: string;
    prevCursor?: string;
  };
}

// LocalStorage key for Zendesk config
const ZENDESK_CONFIG_KEY = 'zendesk_config';

// Get config from localStorage
export const getZendeskConfig = (): ZendeskConfig | null => {
  const configStr = localStorage.getItem(ZENDESK_CONFIG_KEY);
  if (configStr) {
    try {
      return JSON.parse(configStr);
    } catch (e) {
      console.error('Failed to parse Zendesk config from localStorage:', e);
      return null;
    }
  }
  return null;
};

// Save config to localStorage
export const saveZendeskConfig = (config: ZendeskConfig): void => {
  localStorage.setItem(ZENDESK_CONFIG_KEY, JSON.stringify(config));
};

// Clear config from localStorage
export const clearZendeskConfig = (): void => {
  localStorage.removeItem(ZENDESK_CONFIG_KEY);
};

// Helper to format auth headers
const getAuthHeaders = () => {
  const config = getZendeskConfig();
  if (!config) {
    throw new Error('Zendesk configuration not found. Please configure your API settings.');
  }
  
  const credentials = `${config.email}/token:${config.apiToken}`;
  const encodedCredentials = btoa(credentials);
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${encodedCredentials}`
  };
};

// Get all redirect rules
export const getRedirectRules = async (filters: RedirectRuleFilters = {}): Promise<PaginatedResponse<RedirectRule>> => {
  try {
    const config = getZendeskConfig();
    if (!config) {
      throw new Error('Zendesk configuration not found. Please configure your API settings.');
    }

    // Build query string from filters
    const params = new URLSearchParams();
    
    if (filters.search && filters.search.trim() !== '') {
      // Based on error: Value `undefined` for /filter/redirect_from_prefix is of type `undefined`; expected `string of at most 100 characters`
      // Let's try the exact format from the error message
      const searchTerm = filters.search.trim().substring(0, 100);
      params.append('filter[redirect_from_prefix]', searchTerm);
      
      // Log the exact request format for debugging
      console.log('Filter params:', params.toString());
    }
    
    if (filters.cursor) {
      params.append('page[cursor]', filters.cursor);
    }
    
    if (filters.per_page) {
      params.append('page[size]', String(filters.per_page));
    }
    
    // Add sorting parameter - default to id in descending order (newest first)
    const sortParam = filters.sort || '-id';
    params.append('sort', sortParam);
    
    const queryString = params.toString();
    // Using exactly the format from the documentation
    const url = `${config.subdomain}/api/v2/guide/redirect_rules${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching redirect rules from:', url);
    
    const response = await fetch(
      url,
      { headers: getAuthHeaders() },
    );
    
    if (!response.ok) {
      console.error('API Error Response:', response.status, response.statusText);
      let errorMessage = `Error fetching redirect rules: ${response.statusText}`;
      
      try {
        // Try to parse error response
        const errorData = await response.json();
        console.error('Error data:', errorData);
        if (errorData.errors && errorData.errors.length > 0) {
          const firstError = errorData.errors[0];
          errorMessage = `API Error: ${firstError.title || firstError.code || response.statusText}`;
        }
      } catch (parseError) {
        // If we can't parse the error, just use the status text
        console.error('Failed to parse error response:', parseError);
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('API Response data:', data);
    
    // Return formatted response with records and pagination metadata
    return {
      data: data.records || [],
      meta: {
        hasMore: data.meta?.has_more || false,
        nextCursor: data.meta?.after_cursor,
        prevCursor: data.meta?.before_cursor
      }
    };
  } catch (error) {
    console.error('Failed to fetch redirect rules:', error);
    throw error;
  }
};

// Create a new redirect rule
export const createRedirectRule = async (rule: RedirectRuleInput): Promise<void> => {
  try {
    const config = getZendeskConfig();
    if (!config) {
      throw new Error('Zendesk configuration not found. Please configure your API settings.');
    }

    const url = `${config.subdomain}/api/v2/guide/redirect_rules`;
    console.log('Creating redirect rule at:', url);
    console.log('Request payload:', { redirect_rule: rule });
    
    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ redirect_rule: rule })
      }
    );
    
    if (!response.ok) {
      console.error('API Error Response:', response.status, response.statusText);
      let errorText = '';
      try {
        const errorData = await response.text();
        console.error('Response body:', errorData);
        errorText = errorData;
      } catch (e) {
        console.error('Failed to read error response body');
      }
      throw new Error(`Error creating redirect rule: ${response.statusText} ${errorText}`);
    }
    
    // Handle 204 No Content response (no response body)
    if (response.status === 204) {
      console.log('Successfully created redirect rule (204 No Content)');
      return;
    }
    
    // Try to parse JSON only if there's content
    try {
      const data = await response.json();
      console.log('Create response:', data);
    } catch (e) {
      console.log('No JSON response body (expected for 204 status)');
    }
  } catch (error) {
    console.error('Failed to create redirect rule:', error);
    throw error;
  }
};

// Delete a redirect rule
export const deleteRedirectRule = async (id: string): Promise<void> => {
  try {
    const config = getZendeskConfig();
    if (!config) {
      throw new Error('Zendesk configuration not found. Please configure your API settings.');
    }

    const url = `${config.subdomain}/api/v2/guide/redirect_rules/${id}`;
    console.log('Deleting redirect rule at:', url);
    
    const response = await fetch(
      url,
      {
        method: 'DELETE',
        headers: getAuthHeaders()
      }
    );
    
    if (!response.ok) {
      console.error('API Error Response:', response.status, response.statusText);
      let errorText = '';
      try {
        const errorData = await response.text();
        console.error('Response body:', errorData);
        errorText = errorData;
      } catch (e) {
        console.error('Failed to read error response body');
      }
      throw new Error(`Error deleting redirect rule: ${response.statusText} ${errorText}`);
    }
  } catch (error) {
    console.error(`Failed to delete redirect rule ${id}:`, error);
    throw error;
  }
}; 