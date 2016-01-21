#pragma strict

private var app:MuffinButton = null;
private var buyButton:UnityEngine.UI.Button = null;
private var playButton:UnityEngine.UI.Button = null;
private var price:UnityEngine.UI.Text = null;
private var labelImage:UnityEngine.UI.RawImage = null;
private var muffin:UnityEngine.UI.RawImage = null;
private var levelTitle:UnityEngine.UI.Text = null;
private var status:UnityEngine.UI.Text = null;
private var currentStatus:UnityEngine.UI.Text = null;
private var episode:UnityEngine.UI.Text = null;
private var locked:UnityEngine.UI.RawImage = null;

private var currentLevel:Number = 0;
private var perSecondBonus:Number = 0;
private var perClickBonus:Number = 0;
private var index:Number = 0;
private var baseCost:Number = 0;
private var currentCost:Number = 0;


function Start () {
}

private function _buyClicked() {
	Debug.Log("Buy Clicked " + index );
	if (app.upgradedSomething(perClickBonus, perSecondBonus, currentCost)) {
		currentLevel++;
		UpdateLabels();
	}
}

function initialize (
	levelIndex:Number,
	episodeIndex:Number,
	title:String,
	baseClickPerSecond:Number,
	basePerClick:Number,
	baseUnlockCost:Number) {

	app = GameObject.Find("App").GetComponent.<MuffinButton>();
	buyButton = this.transform.Find("BuyButton").GetComponent.<UnityEngine.UI.Button>();
	playButton = this.transform.Find("PlayButton").GetComponent.<UnityEngine.UI.Button>();
	price = this.transform.Find("Price").GetComponent.<UnityEngine.UI.Text>();
	labelImage = this.transform.Find("LabelImage").GetComponent.<UnityEngine.UI.RawImage>();
	muffin = this.transform.Find("Muffin").GetComponent.<UnityEngine.UI.RawImage>();
	levelTitle = this.transform.Find("Title").GetComponent.<UnityEngine.UI.Text>();
	status = this.transform.Find("Status").GetComponent.<UnityEngine.UI.Text>();
	currentStatus = this.transform.Find("CurrentStatus").GetComponent.<UnityEngine.UI.Text>();
	episode = this.transform.Find("Episode").GetComponent.<UnityEngine.UI.Text>();
	locked = this.transform.Find("Locked").GetComponent.<UnityEngine.UI.RawImage>();
	var that = this;
	buyButton.onClick.AddListener(this._buyClicked);
	app.somethingChangedEvent.AddListener(this.UpdateLabels);

	playButton.gameObject.active = false;
	labelImage.gameObject.active = false;
	this.index = levelIndex;
	this.currentLevel = 0;
	this.perSecondBonus = baseClickPerSecond;
	this.perClickBonus = basePerClick;
	this.baseCost = baseUnlockCost;

	episode.text = "Episode " + levelIndex;
	levelTitle.text = "" + title;

	this.UpdateLabels();
}

function UpdateLabels() {
	currentCost = app.calculateCost(this.baseCost, this.currentLevel);
	price.text = "" + currentCost;
	if (this.perSecondBonus > 0) {
		status.text = "Next Level +" + app.calculateNextBonus(this.perSecondBonus, this.currentLevel	) + " per second";
		currentStatus.text = "Level " + this.currentLevel + ": " + app.calculateBonus(this.perSecondBonus, this.currentLevel) + " per second";
	} else {
		status.text = "Next Level +" + app.calculateNextBonus(this.perClickBonus, this.currentLevel	) + " per click";
		currentStatus.text = "Level " + this.currentLevel + ": " + app.calculateBonus(this.perClickBonus, this.currentLevel) + " per click";
	}
}

function Update () {
}