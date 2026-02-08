export type EmailJob =
  | {
      type: "WISHLIST";
      payload: {
        userEmail: string;
        countdown: {
          months: number;
          days: number;
          hours: number;
        };
      };
    }
  | {
      type: "CONTACT";
      payload: {
        fullName: string;
        email: string;
        mobile?: string;
        message: string;
        hasAttachment: boolean;
      };
    };
