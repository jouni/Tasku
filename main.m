//
//  main.m
//  Tasku
//
//  Created by Jouni Koivuviita on 2.6.2011.
//  Copyright Vaadin Ltd. 2011. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <AppleScriptObjC/AppleScriptObjC.h>

int main(int argc, char *argv[])
{
	[[NSBundle mainBundle] loadAppleScriptObjectiveCScripts];

	return NSApplicationMain(argc, (const char **) argv);
}
