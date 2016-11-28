//
//  AppDelegate.swift
//  TARPAZ DEMO
//
//  Created by Suri on 11/25/16.
//  Copyright © 2016 Suri. All rights reserved.
//

import UIKit
import UserNotifications

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {

    var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        let center = UNUserNotificationCenter.current();
        center.requestAuthorization(options: [.badge, .alert, .sound], completionHandler:{(granted, error) -> Void in
            application.registerForRemoteNotifications();
        });
        resetBadges();
        
        return true
    }
    
    func resetBadges() {
        UIApplication.shared.applicationIconBadgeNumber = 0;
    }
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        
        let session = URLSession.shared;
        let deviceString = deviceToken.reduce("", {$0 + String(format: "%02X", $1)});
        let paramString = "token=<" + deviceString + ">";
        
        var req = URLRequest(url: URL(string: TPConstants.DOMAIN + "/api/storetoken")!);
        
        req.httpMethod = "POST";
        req.cachePolicy = URLRequest.CachePolicy.reloadIgnoringCacheData;
        req.httpBody = paramString.data(using: String.Encoding.utf8);
        
        let task = session.dataTask(with: req, completionHandler: {(data, response, error) -> Void in
            guard let data = data, error == nil else {
                print("error\(error)");
                return;
            }
            
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {           // check for http errors
                print("statusCode should be 200, but is \(httpStatus.statusCode)")
                print("response = \(response)")
            }
            
            let responseString = String(data: data, encoding: .utf8)
            print("responseString = \(responseString)")
            
        });
        
        task.resume();
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        //print(error);
        
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }
    
}

