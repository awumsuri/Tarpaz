//
//  ViewController.swift
//  TARPAZ DEMO
//
//  Created by Suri on 11/25/16.
//  Copyright © 2016 Suri. All rights reserved.
//

import UIKit

class TPWebViewController: UIViewController, UIWebViewDelegate {

    @IBOutlet weak var webView: UIWebView!
    @IBOutlet weak var refreshButton: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.  
        setupView();
    }
    
    func setupView() {
        positionRefershButton();
        loadPage();
    }
    
    func positionRefershButton() {
        refreshButton.frame = CGRect(x: (TPConstants.SCREEN_WIDTH - refreshButton.frame.size.width) / 2,
                       y: TPConstants.SCREEN_HEIGHT - refreshButton.frame.size.height - 3,
                       width: refreshButton.frame.size.width, height: refreshButton.frame.size.height);
        let tap = UITapGestureRecognizer(target: self, action:#selector(self.refreshHandler(_:)));
        refreshButton.addGestureRecognizer(tap);
        refreshButton.isUserInteractionEnabled = true;        
    }
    
    func refreshHandler(_ gesture: UITapGestureRecognizer) {
        
        loadPage();
    }
    
    func loadPage() {
        let request = URLRequest(url: URL(string: TPConstants.DOMAIN+"/static/")!);
        webView.scalesPageToFit = true;
        webView.loadRequest(request);
    }
    
    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    func webViewDidFinishLoad(_ webView: UIWebView) {
        
    }
    
    func webViewDidStartLoad(_ webView: UIWebView) {
        
    }
    
    func webView(_ webView: UIWebView, didFailLoadWithError error: Error) {
        print(error);
    }
    
    override var shouldAutorotate: Bool {
        return false;
    }
   

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

