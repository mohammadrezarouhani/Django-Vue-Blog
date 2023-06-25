<template>
    <div class="dahsboard">
        <div class="report">
            <div class="card-container">
                <div class="card">
                    <span class="material-symbols-sharp " style="color: var(--color-primary);">comment</span>
                    <h2>Comments</h2>
                    <h3>46</h3>
                </div>
                <div class="card">
                    <span class="material-symbols-sharp" style="color: var(--color-danger);">pages</span>
                    <h2>Post</h2>
                    <h3>46</h3>
                </div>
            </div>
        </div>

        <div class="recent-comment">
            <div class="comment">
                <span class="material-symbols-sharp">reviews</span>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit, voluptas.</p>
            </div>
        </div>

        <div class="recent-post">
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>summary</th>
                        <th>comment</th>
                        <th>created at</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>title</td>
                        <td>summary</td>
                        <td>23</td>
                        <td>2 july,2020</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.dahsboard {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 2fr;
    grid-template-areas:
        "report comment"
        "post comment";
}

/* -------------------------- Report -------------------- */
.dahsboard .report {
    grid-area: report;
}

.dahsboard .report .card-container {
    display: flex;
    gap: 2rem;
    width:95%;
    margin: 0px auto;
    margin-top: 1rem;
}

.dahsboard .report .card-container .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--color-white);
    width: 50%;
    height: 100%;
    gap: 2rem;
    padding: var(--card-padding);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
}

.dahsboard .report .card-container .card span {
    font-size: 2rem !important;
}

/* --------------------- Recent Comment ----------------------- */
.dahsboard .recent-comment {
    grid-area: comment;
    background-color: var(--color-white);
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    margin: 0px auto;
    margin-top: 1rem;
    width: 95%;
    height: 85%;
    box-shadow: var(--box-shadow);
}

.dahsboard .recent-comment .comment {
    display: flex;
    width: 100%;
    align-items: center;
    padding: var(--card-padding);
    border-radius: var(--card-border-radius);
    background-color: var(--color-light);
    gap: .8rem;
    height: 20%;
    width: 100%;
}


/* --------------------- recent Post -------------------------- */
.dahsboard .recent-post {
    grid-area: post;
    width: 95%;
    margin: 0px auto;
    margin-top: 1rem;
}

.dahsboard .recent-post table {
    text-align: center;
    width: 100%;
    background-color: var(--color-white);
    padding: var(--card-padding);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
}

.dahsboard .recent-post table td{
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
}

.dahsboard .recent-post table tbody tr:last-child td{
    border-bottom:none;
}
</style>
