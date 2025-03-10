
export interface LandingPage {
  id: string;
  city: string;
  state: string;
  keywords: string[];
  tone: string;
  createdAt: Date;
  content: {
    introduction: string;
    whyUs: string;
    thingsToDo: string;
    faq: {
      question: string;
      answer: string;
    }[];
  };
}
