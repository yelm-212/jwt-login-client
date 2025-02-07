export interface JsonError {
  response?: {
    status: number;
    data: {
      error: string;
      message: string;
    };
  };
  config: {
    url: string;
    headers: Record<string, string>;
    _retry?: boolean;
  };
}
