class UILayerMamager extends DD.DDUILayerManager {
	private static _instance:UILayerMamager;
	public static getInstance():UILayerMamager{
		if(!UILayerMamager._instance)
			UILayerMamager._instance = new UILayerMamager();
		return UILayerMamager._instance;
	}
		
	public static UILAYER_START:string = "UILAYER_START";
	public static UILAYER_GAMMING:string = "UILAYER_GAMMING";
	public constructor() {
		super();
		this.register_layer(UILayerMamager.UILAYER_START, []);
		this.register_layer(UILayerMamager.UILAYER_GAMMING, []);
	}

	public createLayer(type:string):DD.DDUILayerBaseClass{
		switch(type){
			case UILayerMamager.UILAYER_START:
				return new UILayerStart();
			case UILayerMamager.UILAYER_GAMMING:
				return new UILayerGamming();
		}
		return null;
	}

}