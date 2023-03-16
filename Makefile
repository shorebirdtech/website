# I'm sure there is a better way to do this, but this is simple for now.

DEPS = TEMPLATE.html render/bin/render.dart
HTMLS = terms.html 

%.html: %.md $(DEPS)
	dart run render/bin/render.dart $<

.PHONY: all

all: $(HTMLS)
