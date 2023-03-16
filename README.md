# Website
shorebird.dev site

# Copyright
Shorebird logo is copyright © 2022 Shorebird. All rights reserved.

Github, Discord, Twitter logos are copyright their respective companies.

# Building

The site uses a very simple custom template system.  I looked at using other
fancier systems, but they all required installing to many things, so I wrote
a very basic one with Dart (and a Makefile).

`dart run render/bin/render.dart FILE.md` will render FILE.md into FILE.html.

`make` will render all the files specified in the Makefile.

I recognize `make` doesn't work out of the box on Windows (not to mention being
archaic in its syntax), so it's possible we should replace it with a simple Dart
script instead?

Building is not currently hooked up as part of any action, so you need to build
the site manually before committing.

.html files are built right next to the .md files, we may wish to change this
in the future.

Another approach would be to just move to GitHub pages.  Right now shorebird.dev
is hosted on a DigitalOcean droplet, but we could just use GitHub pages instead.