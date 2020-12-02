#
# Makefile (for Ellis)
#

assignment.json:
	node randomize.js
	#python randomize.py
	python write_files.py

print:
	@for i in $$(ls assignment*.txt); do echo; cat $$i; done

clean:
	rm -rf assignment*

