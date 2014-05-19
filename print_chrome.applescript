delay 0.3 -- time to release modifier keys if the script is run with a shortcut
tell application "System Events" to tell (process 1 where frontmost is true)
    if name is "Google Chrome" then
        keystroke "p" using {option down, command down}
        delay 0.1
        tell menu button 1 of window 1
            click
            click menu item "Save as PDF…" of menu 1
        end tell
        keystroke "l" using {option down, command down}
        keystroke return
    else
        keystroke "p" using command down
        tell menu button 1 of sheet 1 of window 1
            click
            click menu item "Save as PDF…" of menu 1
        end tell
        keystroke "l" using {option down, command down}
        keystroke return
    end if
end tell