//
//  MainWindowDelegate.m
//  Tasku
//
//  Created by Jouni Koivuviita on 3.6.2011.
//

#import "MainWindowDelegate.h"


@implementation MainWindowDelegate

IBOutlet NSWindow *mainwindow;

- (BOOL)windowShouldClose:(id)sender {
	[[self window] orderOut:nil];
	return NO;
}

- (void)awakeFromNib {
	[[self window] makeKeyAndOrderFront:nil];
}

@end
