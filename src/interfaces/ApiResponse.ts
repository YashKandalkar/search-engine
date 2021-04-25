export interface ApiResponse {
  result: {
    url: string;
    text: string | null;
    title?: string;
    tag?: "string";
  }[];
  count?: number;
}
