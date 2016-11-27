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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.        
        let request = URLRequest(url: URL(string: "http://google.com")!);
        webView.loadRequest(request);
        
    }
    
    func webViewDidFinishLoad(_ webView: UIWebView) {
        
    }
    
    func webViewDidStartLoad(_ webView: UIWebView) {
        
    }
    
    func webView(_ webView: UIWebView, didFailLoadWithError error: Error) {
        print(error);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

