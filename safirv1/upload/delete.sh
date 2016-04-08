#!/bin/bash

#!/bin/bash

cat delete.csv | while read file
do
	echo "deleting $file"
	sudo rm -rf $file
	wait
done

