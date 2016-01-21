#pragma strict

import System;  
import System.Collections.Generic;

public var muffinCounter:UnityEngine.UI.Text = null;
private var muffinCount:Number = 0;
private var muffinsPerClick:Number = 1;
private var muffinsPerSecond:Number = 0;
public var levelPrefab:GameObject = null;
public var levelImagry:List.<GameObject> = new List.<GameObject>();
public var levelContainer:GameObject = null;

function CreateLevel(
	levelIndex:Number,
	episodeIndex:Number,
	title:String,
	baseClickPerSecond:Number,
	basePerClick:Number,
	baseUnlockCost:Number) {

	var newLevel:GameObject = Instantiate(levelPrefab, Vector3 (246, (-160 * levelIndex) + 85, 0), Quaternion.identity);
	newLevel.transform.parent = levelContainer.transform;
	var levelComponent:MuffinLevel = newLevel.GetComponent.<MuffinLevel>();
	levelComponent.initialize(levelIndex, episodeIndex, title, baseClickPerSecond, basePerClick, baseUnlockCost);
	//newLevel.transform.right = 0;

}

public var somethingChangedEvent:UnityEngine.Events.UnityEvent = null;
private var lastTime:Number = 0;

function Start () {
	lastTime = Mathf.Floor(Time.time);
	GameObject.Destroy( GameObject.Find("ExampleLine") );
	GameObject.Destroy( GameObject.Find("ExampleLine2") );

	somethingChangedEvent = new UnityEngine.Events.UnityEvent();

	/* levelIndex, episodeIndex, title, baseClickPerSecond, basePerClick, baseUnlockCost */
	CreateLevel(1,1,"Dragonball Z Abridged: Episode 1", 0, 1, 10);
	CreateLevel(2,1,"Introduction of Raditz", 1, 0, 10);
	CreateLevel(3,1,"Meet the Farmer", 10, 0, 100);
	CreateLevel(4,1,"Tom's Myspace Page", 0, 10, 100);
}

function Update () {
	var nowTime:Number = Mathf.Floor(Time.time);
	if (nowTime > lastTime) {
		muffinCount += muffinsPerSecond * (nowTime - lastTime);
		lastTime = nowTime;
	    muffinCounter.text = "" + muffinCount;
	}

}

function muffinClickHandler() {
    Debug.Log("Test");
    muffinCount += muffinsPerClick;
    muffinCounter.text = "" + muffinCount;
}
private var totalUpgradeCount:Number = 0;

function upgradedSomething(addPerClick:Number, addPerSecond:Number, cost:Number) {
	if (muffinCount >= cost) {
		totalUpgradeCount++;
		muffinCount -= cost;
		muffinsPerClick += addPerClick;
		muffinsPerSecond += addPerSecond;
		somethingChangedEvent.Invoke();
	    muffinCounter.text = "" + muffinCount;

		return true;
	} else {
		return false;
	}
}

function calculateCost( baseCost:Number, currentLevel:Number ) {
	return Math.Ceiling(baseCost * Mathf.Pow(2, ((totalUpgradeCount * 0.1) + currentLevel)));
}

function calculateBonus( baseBonus:Number, currentLevel:Number ) {
	return Math.Ceiling(baseBonus * currentLevel);
}

function calculateNextBonus( baseBonus:Number, currentLevel:Number ) {
	return baseBonus;
}