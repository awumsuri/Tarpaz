//
//  ViewController.swift
//  TARPAZ DEMO
//
//  Created by Suri on 11/25/16.
//  Copyright © 2016 Suri. All rights reserved.
//

import UIKit

class TPWebViewController: UIViewController {

    @IBOutlet weak var webView: UIWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        print("loaded");
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

