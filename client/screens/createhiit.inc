<form id="hiitForm" class=hiit-form>
<section class="added-exercises-holder">

</section>
    <label for="hiitName">HIIT Name:</label>
    <input type="text" class="hiitName" name="hiitName" placeholder="hiit quick blast" required>

    <label for="hiitDesc">HIIT Description:</label>
    <textarea placeholder="Hiit Description" class="hiitDescription" name="hiitDesc" rows="4" required></textarea>

        <section class="new-exercise">
            <label for="exerciseName">Exercise Name:</label>
            <input type="text" class="exerciseName" placeholder="lunges" name="exerciseName" required>

            <label for="exerciseDesc">Exercise Description:</label>
            <textarea placeholder="Exercise Description" class="exerciseDesc" rows="4" name="exerciseDesc" required></textarea>

            <label for="exerciseDuration">Exercise Duration (in seconds):</label>
            <input type="number" placeholder="Exercise Duration" class="exerciseDuration" min="1" name="exerciseDuration" required>

            <label for="restDuration">Rest Duration (in seconds):</label>
            <input type="number" placeholder="rest Duration" class="restDuration" min="1" name="restDuration" required>
        </section>
    <button class="add-btn" type="button" class="addExerciseBtn">Add Exercise</button>
    <button class="create-btn" type="submit">Create HIIT</button>
</form>