// Problem 2.  Random numbers

// TO-DO:  Expand on our HTML code for the task.
var page = createWebpageFromTemplate(
<div>Please pick a number from 1 to 10
<textarea style="width:350px;height:30px" name="newText">..</textarea>
<br></br>
 <input type="submit" value="Submit"></input>
</div>);

// TO-DO define the HIT parameters.
var hitParams = {
	title: "Pick a Number",
	desc: "Pick a number from 1 to 10.",
	url: page,
	maxAssignments : 5,
	reward: .02
}

// Create the HIT
var hit = mturk.createHIT(hitParams)
print("Hit created  : "+ hit)

//Report the results on the writeup
    