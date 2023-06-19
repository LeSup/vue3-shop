declare namespace API {
  type HotWord = {
    word: string;
    inSearchBox: number;
    id: number;
  };

  type Img = {
    imgUrl: string;
    title: string;
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
    ads?: Img[];
    grids?: Img[];
    qualityPrds?: Product[];
    phonePrds?: Product[];
    computePrds?: Product[];
    ipadPrds?: Product[];
  }

  type CategoryConfigInfoDataSource = {
    dataSourceCode: string;
    dataSourceType: string;
  }

  type CategoryConfigInfo = {
    sceneCode: string;
    sceneName: string;
    dataSourceList: CategoryConfigInfoDataSource[];
  }

  type Category = {
    categoryId: number;
    categoryName: string;
    dataSourceCode: string;
    configInfo: CategoryConfigInfo;
    subCategoryList: Category[];
  }

  type AdImg = {
    adTitle: string;
    adImgUrl: string;
  }

  type DataMap = {
    [name: string]: Product[] | AdImg[];
  }

  type MineInfo = {
    promotions?: API.Img[];
    tools?: API.Img[];
  }
}