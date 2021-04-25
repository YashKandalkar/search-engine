export interface ApiResponse {
  result: {
    url: string;
    text: string | null;
    title?: string;
    tags?: string | string[];
  }[];
  count?: number;
}
