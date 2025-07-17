export interface FrameRequest {
  trustedData: {
    messageBytes: string;
  };
  untrustedData: {
    fid: number;
    url: string;
    messageHash: string;
    timestamp: number;
    network: number;
    buttonIndex: number;
    inputText?: string;
    castId: {
      fid: number;
      hash: string;
    };
  };
}

export interface FrameResponse {
  image: string;
  buttons?: Array<{
    label: string;
    action?: 'post' | 'post_redirect' | 'link';
    target?: string;
  }>;
  input?: {
    text: string;
  };
  post_url?: string;
}

export interface LotteryStats {
  totalETH: string;
  nextDrawTime: number;
  ticketsCount: number;
  userTickets: number;
}