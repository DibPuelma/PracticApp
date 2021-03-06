package com.practica;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.lwansbrough.RCTCamera.RCTCameraPackage;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

public class MainApplication extends Application implements ReactApplication {


  private static CallbackManager mCallbackManager =
    CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost =
    new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new ReactNativeOneSignalPackage(),
        new FBSDKPackage(mCallbackManager),
        new RCTCameraPackage()
      );
    }
  };

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}
