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
    
    private let request = URLRequest(url: URL(string: TPConstants.DOMAIN+"/static/")!);    
    private var isAnimating: Bool = false;
    
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
        UIView.animate(withDuration: 1.0, delay: 0.1, options: UIViewAnimationOptions.curveEaseOut, animations:{ () -> Void in
            self.isAnimating = true;
            self.view.autoresizesSubviews = false;
            self.refreshButton.transform = CGAffineTransform(rotationAngle: CGFloat(M_PI))
            
        } , completion: {(_:Bool) -> Void in
            print("completed rotation");
            self.refreshButton.transform = CGAffineTransform(rotationAngle: CGFloat(0));
        });
        
        loadPage();
    }
    
    func loadPage() {
        
        webView.scalesPageToFit = true;
        webView.delegate = self;
        webView.loadRequest(request);
    }
    
    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    func webViewDidFinishLoad(_ webView: UIWebView) {
        isAnimating = false;
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

