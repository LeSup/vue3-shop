declare namespace API {
  type HotWord = {
    word: string;
    inSearchBox: number;
    id: number;
  };

  type ImgInfo = {
    id: number;
    imgUrl: string;
    title: string;
    bgColor: string;
  }

  type ActivityPromInfo = {
    promotionTag: string;
    promotionWords?: string;
    type: number;
  }

  type Product = {
    prdId: number;
    prdName: string;
    prdPromotion: string;
    buyBottonText: string;
    photoName: string;
    photoPath: string;
    originPrice: number;
    salePrice: number;
    priceEndWithQi: string;
    activityPromInfoList: ActivityPromInfo[];
  }

  type HomeInfos = {
    ads?: ImgInfo[];
    grids?: ImgInfo[];
    qualityPrds?: Product[];
    phonePrds?: Product[];
    computePrds?: Product[];
    ipadPrds?: Product[];
  }
}