# Nonconsanguineous Random Secret Santa

Hey everyone, Happy Holidays!

Here's the code: for each person it randomly chooses a target outside the
person's family.

I took the opportunity to practice some Javascript (`randomize.js`) and you can
compare to the equivalent Python (`randomize.py`).  There are a few things
built in to Python that I haven't found equivalents for yet in Javascript (set
equality, list zip, and list/dict comprehensions).

I included a Makefile just for Ellis.

To run:
```
make
```

This creates a text file `assignment_??????.txt` for each family that I will
email.

To see the assignment:
```
make print
```

To reset:
```
make clean
```

