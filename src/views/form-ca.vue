<template>
    <div>
        <div class="card p-3">
            <center>

                <h1>
                    <b>
                        <u>

                            FORM CA
                        </u>
                    </b>
                </h1>
            </center>
            <form method="post" @submit.prevent="fun()" enctype="multipart/form-data">
                <h4>
                    Details of Main Allotee
                </h4>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="exampleInputEmail1">Name</label>
                        <input v-model="nameAllotee" type="text" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter name">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="exampleInputPassword1">Addhar No.</label>
                        <input v-model="addhar" type="number" class="form-control" id="exampleInputPassword1"
                            placeholder="Number">
                    </div>

                    <div class="form-group col-sm-3">
                        <label for="exampleInputEmail1">Address</label>
                        <textarea v-model="address" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter address"></textarea>
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="exampleInputPassword1">Email</label>
                        <input v-model="email" type="email" class="form-control" id="exampleInputPassword1"
                            placeholder="Email">
                    </div>
                </div>


                <div class="row">

                    <div class="form-group col-sm-3">
                        <label for="exampleInputEmail1">Phone</label>
                        <input v-model="phone" type="text" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter Phone">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="exampleInputPassword1">Flat No.</label>
                        <input v-model="flat" type="text" class="form-control" id="exampleInputPassword1"
                            placeholder="Number">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="exampleInputPassword1">Tower No.</label>
                        <input v-model="tower" type="text" class="form-control" id="exampleInputPassword1"
                            placeholder="Number">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="exampleInputPassword1">Area</label>
                        <input v-model="area" type="number" class="form-control" id="exampleInputPassword1"
                            placeholder="Area">
                    </div>


                </div>

                <h4>
                    Details of main co-Allotee
                </h4>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <label for="exampleInputEmail1">Name</label>
                        <input v-model="nameCoAllotee" type="text" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter name">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group col-sm-6">
                        <label for="exampleInputPassword1">Addhar No.</label>
                        <input v-model="addharCo" type="number" class="form-control" id="exampleInputPassword1"
                            placeholder="Number">
                    </div>
                </div>

                <h4>
                    Details of Claim Amt (in Rs.)
                </h4>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="exampleInputEmail1">Principal Amt</label>
                        <input v-model="principalAmt" type="number" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter amount">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="exampleInputPassword1">Interest</label>
                        <input v-model="interest" type="number" class="form-control" id="exampleInputPassword1"
                            placeholder="Interest">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="exampleInputPassword1">Penal/Other Charges</label>
                        <input v-model="othercharges" type="number" class="form-control" id="exampleInputPassword1"
                            placeholder="Other Charges">
                    </div>
                </div>

                <h4>
                    Details of bank account
                </h4>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="exampleInputEmail1">Bank Account Number</label>
                        <input v-model="account_no" type="number" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter Account Number">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="exampleInputPassword1">IFSC Code</label>
                        <input v-model="ifsc" type="text" class="form-control" id="exampleInputPassword1"
                            placeholder="IFSC Code">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="exampleInputPassword1">Name of the bank & branch</label>
                        <input v-model="bank_branch" type="text" class="form-control" id="exampleInputPassword1"
                            placeholder="Enter Bank">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="exampleInputPassword1">Type Of the Account</label>
                        <input v-model="type" type="text" class="form-control" id="exampleInputPassword1"
                            placeholder="Type of the Account">
                    </div>
                </div>

                <!-- <h4>   List of the documents </h5> -->
                <div class="row">
                    <div class="form-group col-sm-12">
                        <label for="exampleInputPassword1">List of Attachments</label>
                        <quill-editor :options="editorOption" v-model="attachmentsList"></quill-editor>
                    </div>
                </div>

                <button @click="Export2Word('exportContent', 'word-content.docx')" type="submit"
                    class="btn btn-primary">Download Word</button>
            </form>
            <!-- <button id="authorize_button" >Authorize</button> -->
            <div class="d-none" id="exportContent">
                <!-- Your content here -->
                <div style="font-family:Bookman Old Style;">
                    <center>
                        <h4>FORM CA</h4>
                        <h4>SUBMISSION OF CLAIM BY FINANCIAL CREDITORS IN A CLASS</h4><span>(Under Regulation 8A of The
                            Insolvency And Bankruptcy (Insolvency Resolution Process For Corporate Persons) Regulations,
                            2016)</span>
                    </center><br><br>
                    <div>Date: {{ currentDate }}
                        <!-- <i> (date of submission)</i> -->
                    </div><br><br>
                    <div>From :{{ nameAllotee != "" && nameCoAllotee != "" ? nameAllotee + ' & ' + nameCoAllotee : '' }}
                        <!-- , <i>(name of Allotee & Co-allotee) </i> -->
                    </div><br><br>
                    <div>Email ID:{{ email }}
                        <!-- , <i>(Email Id)</i> -->
                    </div><br><br>
                    <div>Mob - {{ phone }}
                        <!-- , <i>(Phone)</i>  -->
                    </div><br><br>
                    <div>
                        <p>To: <br>The Interim Resolution Professional,<br>Ahsan Ahmad <br>IBBI Registration No.:
                            IBBI/IPA-002/IP-N00987/2020-21/13183</p>
                        <p><b>Address as set out in Public Announcement for submission of claims:</b></p>
                        <p><b>Ground Floor, No 8, 'VK Commerce', 3rd Main, Rajajinagar Industrial Estate, Bengaluru -
                                560010</b>
                        </p><br><a href='#'>cirp.mantridevelopers@gmail.com</a>
                        <p>Subject: Submission of Claim and Proof of Claim.</p>
                        <p>Sir,</p>
                        <p>We, {{ nameAllotee != "" && nameCoAllotee != "" ? nameAllotee + ' & ' + nameCoAllotee : "" }} (Name
                            of the Allottee / Co- Allottee), hereby
                            submits this claim in respect of the Corporate Insolvency Resolution Process of Mantri
                            Developers
                            Private Limited for the project "Mantri Webcity"</p>
                        <p>The details for the same are set out below:</p>
                    </div>
                    <div style="text-align:center;width:70%">
                        <table cellpadding="0" cellspacing="0"
                            style="width:55.78%!important; margin-right:auto; margin-left:auto; border:0.75pt solid #000000; border-collapse:collapse;">
                            <thead>
                                <tr style="height:8.75pt;">
                                    <td colspan="3"
                                        style="width:469.95pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top; background-color:#f2f2f2;">
                                        <h1
                                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; page-break-after:avoid; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style'; font-weight:normal;">Relevant
                                                particulars</span>
                                        </h1>
                                        <p style="margin-top:0pt; margin-bottom:8pt; line-height:108%; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="height:4.85pt;">
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; text-align:justify; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps;">
                                                &nbsp;</li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Name of financial creditor</span>
                                        </p>
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">Name of the Allottee / Co-
                                                Allottee</span>
                                        </p>
                                        <ol style="margin:0pt; padding-left:0pt;" type="i">
                                            <li
                                                style=" text-align:justify; padding-left:19.97pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span>{{ nameAllotee }}</span>
                                            </li>
                                            <li
                                                style=" text-align:justify; padding-left:19.97pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span>{{ nameCoAllotee }}</span>
                                            </li>
                                        </ol>
                                        <!-- <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <span
                                                style="font-family:'Bookman Old Style';   ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                                                style="font-family:'Bookman Old Style';   ">(ii){{ nameCoAllotee }}</span>
                                        </p> -->
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="2" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; text-align:justify; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps;">
                                                &nbsp;</li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Identification number the financial
                                                creditor</span></p>
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Times New Roman';">(</span><span
                                                style="font-family:'Bookman Old Style';">if an incorporated body, provide
                                                identification number and proof of incorporation</span><span
                                                style="font-family:'Times New Roman';">.&nbsp;</span><span
                                                style="font-family:'Bookman Old Style';">If a partnership or individual
                                                provide identification records of all the partners or the
                                                individual</span><span style="font-family:'Times New Roman';">)</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <h1
                                            style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; page-break-after:avoid; font-size:12pt;">
                                            <span
                                                style="font-family:'Bookman Old Style'; font-weight:normal;   ">Owner:</span>
                                        </h1>
                                        <p style="margin:0pt 3.55pt 8pt 1pt; line-height:108%; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';   ">AADHAR
                                                NO: {{ addhar }}</span></p>
                                        <p
                                            style="margin-top:0pt; margin-right:3.55pt; margin-bottom:8pt; line-height:108%; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">Co-owner:</span>
                                        </p>
                                        <p style="margin:0pt 3.55pt 8pt 1pt; line-height:108%; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';   ">AADHAR
                                                NO: {{ addharCo }}</span></p>
                                    </td>
                                </tr>
                                <tr style="height:12.1pt;">
                                    <td
                                        style=" border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="3" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                </li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Address and email address of the
                                                financial creditor for correspondence</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                style="font-family:'Times New Roman';   ">Add: {{ address }}</span></p>
                                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <span style="font-family:'Times New Roman';   ">Contact
                                                No. - {{ phone }}</span>
                                        </p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Times New Roman';">&nbsp;</span></p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Times New Roman';   ">Email- {{
                                                    email }}</span><span
                                                style="font-family:'Times New Roman'; font-size:10pt;   ">&nbsp;</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr style="height:19.35pt;">
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="4" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; text-align:justify; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps;">
                                                &nbsp;</li>
                                        </ol>
                                    </td>
                                    <td colspan="2"
                                        style="width:442.05pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Total amount of claim (In
                                                Rs.)&nbsp;</span><strong><span
                                                    style="font-family:'Book Antiqua'; font-size:11pt;">{{
                                                        Number(principalAmt)
                                                        + Number(interest) + Number(othercharges) }}</span></strong></p>
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Times New Roman';">(</span><span
                                                style="font-family:'Bookman Old Style';">including any interest as at the
                                                insolvency commencement date</span><span
                                                style="font-family:'Times New Roman';">)</span></p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;">
                                            <strong><span style="font-family:'Bookman Old Style';">&nbsp;</span></strong>
                                        </p>
                                    </td>
                                </tr>
                                <tr style="height:19.35pt;">
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p
                                            style="margin-top:0pt; margin-left:9pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <span
                                                style="font-family:'Bookman Old Style'; font-variant:small-caps;">&nbsp;</span>
                                        </p>
                                    </td>
                                    <td colspan="2"
                                        style="width:442.05pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                        <table cellpadding="0" cellspacing="0"
                                            style="width:431.8pt; border:0.75pt solid #000000; border-collapse:collapse;">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="width:23.35pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle; background-color:#bfbfbf;">
                                                        <p
                                                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;">
                                                            <strong><span style="font-family:'Bookman Old Style';">Item
                                                                    No.</span></strong>
                                                        </p>
                                                    </td>
                                                    <td
                                                        style="width:159.3pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle; background-color:#bfbfbf;">
                                                        <p
                                                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;">
                                                            <strong><span
                                                                    style="font-family:'Bookman Old Style';">Particulars</span></strong>
                                                        </p>
                                                    </td>
                                                    <td
                                                        style="width:60.1pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle; background-color:#bfbfbf;">
                                                        <p
                                                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;">
                                                            <strong><span style="font-family:'Bookman Old Style';">Principal
                                                                    Amount</span></strong>
                                                        </p>
                                                    </td>
                                                    <td
                                                        style="width:60.05pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle; background-color:#bfbfbf;">
                                                        <p
                                                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;">
                                                            <strong><span style="font-family:'Bookman Old Style';">Interest
                                                                    @ 8% (Simple)</span></strong>
                                                        </p>
                                                    </td>
                                                    <td
                                                        style="width:74.25pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:middle; background-color:#bfbfbf;">
                                                        <p
                                                            style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;">
                                                            <strong><span
                                                                    style="font-family:'Bookman Old Style';">Total</span></strong>
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style="width:23.35pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">4.1</span></p>
                                                    </td>
                                                    <td
                                                        style="width:159.3pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">Principal amount of
                                                                Claim with interest</span><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;&nbsp;</span>
                                                        </p>
                                                    </td>
                                                    <center>

                                                        <td
                                                            style="width:60.1pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                            <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                                <strong><span
                                                                        style="font-family:'Book Antiqua';"></span></strong><strong><span
                                                                        style="font-family:'Book Antiqua';">{{ principalAmt
                                                                        }}&nbsp;</span></strong>
                                                            </p>
                                                            <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;">
                                                                <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                                                            </p>
                                                        </td>
                                                    </center>
                                                    <center>

                                                        <td
                                                            style="width:60.05pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                            <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                                <strong><span
                                                                        style="font-family:'Book Antiqua';"></span></strong><strong><span
                                                                        style="font-family:'Book Antiqua';">{{ interest
                                                                        }}&nbsp;</span></strong>
                                                            </p>
                                                            <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;">
                                                                <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                                                            </p>
                                                        </td>
                                                    </center>
                                                    <center>

                                                        <td
                                                            style="width:74.25pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                            <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                                <strong><span
                                                                        style="font-family:'Book Antiqua';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></strong><strong><span
                                                                        style="font-family:'Book Antiqua';">{{
                                                                            Number(principalAmt)
                                                                            + Number(interest) }}&nbsp;</span></strong>
                                                            </p>
                                                            <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;">
                                                                <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                                                            </p>
                                                        </td>
                                                    </center>

                                                </tr>
                                                <tr>
                                                    <td
                                                        style="width:23.35pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                    <td
                                                        style="width:159.3pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">Penalty for delayed
                                                                possession as per BBA @Rs. 3 per sq feet per month for
                                                                salable area</span></p>
                                                    </td>
                                                    <td
                                                        style="width:60.1pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                            <strong><span
                                                                    style="font-family:'Book Antiqua';"></span></strong>
                                                        </p>
                                                    </td>
                                                    <td
                                                        style="width:60.05pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                            <strong><span
                                                                    style="font-family:'Book Antiqua';"></span></strong>
                                                        </p>
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                    <td
                                                        style="width:74.25pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                            <strong><span
                                                                    style="font-family:'Book Antiqua';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></strong>
                                                        </p>
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                            <strong><span
                                                                    style="font-family:'Book Antiqua';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></strong><strong><span
                                                                    style="font-family:'Book Antiqua';">{{ othercharges
                                                                    }}&nbsp;</span></strong>
                                                        </p>
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                            <strong><span
                                                                    style="font-family:'Book Antiqua';">&nbsp;</span></strong>
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style="width:23.35pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                    <td
                                                        style="width:159.3pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                    <td
                                                        style="width:60.1pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                    <td
                                                        style="width:60.05pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                    <td
                                                        style="width:74.25pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style="width:23.35pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;">
                                                            <strong><span
                                                                    style="font-family:'Bookman Old Style';">&nbsp;</span></strong>
                                                        </p>
                                                    </td>
                                                    <td
                                                        style="width:159.3pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;">
                                                            <strong><span style="font-family:'Bookman Old Style';">Total
                                                                    Debt as on 28.03.{{ newyear }}&nbsp;</span></strong>
                                                        </p>
                                                    </td>
                                                    <td
                                                        style="width:60.1pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                    <td
                                                        style="width:60.05pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                    <td
                                                        style="width:74.25pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top;   ">
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:11pt;">
                                                            <strong><span
                                                                    style="font-family:'Book Antiqua';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></strong><strong><span
                                                                    style="font-family:'Book Antiqua';">{{
                                                                        Number(principalAmt)
                                                                        + Number(interest) +
                                                                        Number(othercharges) }}&nbsp;</span></strong>
                                                        </p>
                                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><br></p>
                                    </td>
                                </tr>
                                <tr style="height:37.75pt;">
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="5" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; text-align:justify; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps;">
                                                &nbsp;</li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Details of documents by reference
                                                to which the debt can be substantiated</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin-top:0pt; margin-bottom:8pt; line-height:108%; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">The details of the documents are
                                                as under:</span>
                                        </p>
                                        <!-- <ol style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:17.08pt; text-align:justify; line-height:108%; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span  >Sale agreement dated 28</span><span
                                                    style="line-height:108%; font-size:8pt;   "><sup>th</sup></span><span
                                                     >&nbsp;April, 2014</span></li>
                                            <li
                                                style="margin-left:17.08pt; text-align:justify; line-height:108%; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span  >Construction agreement dated
                                                    28</span><span
                                                    style="line-height:108%; font-size:8pt;   "><sup>th</sup></span><span
                                                     >&nbsp;April, 2014</span></li>
                                            <li
                                                style="margin-left:17.08pt; text-align:justify; line-height:108%; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span  >Statement of Accounts of the
                                                    Financial Creditors</span></li>
                                            <li
                                                style="margin-left:17.08pt; text-align:justify; line-height:108%; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span  >Claim Computation
                                                    Sheet upto date on the deposited Principal amount w.e.f date of
                                                    payment to Mantri Developers</span></li>
                                            <li
                                                style="margin-left:17.08pt; text-align:justify; line-height:108%; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span  >Payment Reciepts</span></li>
                                            <li
                                                style="margin-left:17.08pt; text-align:justify; line-height:108%; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span  >Cancel Cheque&nbsp;</span></li>
                                            <li
                                                style="margin-left:17.08pt; margin-bottom:8pt; text-align:justify; line-height:108%; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                                                <span  >Adhaar Card</span></li>
                                        </ol> -->
                                        <span v-html="attachmentsList"></span>
                                    </td>
                                </tr>
                                <tr style="height:7.25pt;">
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="6" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; text-align:justify; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps;">
                                                &nbsp;</li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Details of how and when debt
                                                incurred</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;">
                                            <strong><span style="font-family:'Bookman Old Style';   ">Flat
                                                    Number {{ flat }}</span></strong>
                                        </p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;">
                                            <strong><span style="font-family:'Bookman Old Style';   ">Tower-
                                                    {{ tower }}</span></strong>
                                        </p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;">
                                            <strong><span style="font-family:'Bookman Old Style';   ">Area
                                                    {{ area }} Sq.ft.,</span></strong><strong><span
                                                    style="font-family:'Bookman Old Style';">&nbsp;</span></strong><span
                                                style="font-family:'Bookman Old Style';">was allotted to the Financial
                                                Creditors as per the general terms and condition of the sale agreement and
                                                construction agreement as attached above however the possession of the unit
                                                has not been handed over till date.</span>
                                        </p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="width:4.9pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="7" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; text-align:justify; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps;">
                                                &nbsp;</li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Details of any mutual credit,
                                                mutual debts, or other mutual dealings between the corporate debtor and the
                                                creditor which may be set</span><span
                                                style="font-family:'Times New Roman';">-</span><span
                                                style="font-family:'Bookman Old Style';">off against the claim</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">NOT APPLICABLE</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="8" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; text-align:justify; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps;">
                                                &nbsp;</li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Details of any security held, the
                                                value of the security, and the date it was given</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style'; font-variant:small-caps;">NOT
                                                APPLICABLE</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="9" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style="margin-left:5pt; text-align:justify; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps;">
                                                &nbsp;</li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Details of the bank account to
                                                which the amount of the claim or any part thereof can be transferred
                                                pursuant to a resolution plan</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';   ">NAME OF
                                                BANK: {{ bank_branch }}</span></p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';   ">NAME OF
                                                BRANCH</span><span
                                                style="font-family:'Bookman Old Style'; font-variant:small-caps;   ">:
                                                {{ bank_branch }}</span></p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style'; font-variant:small-caps;   ">BANKACCOUNT
                                                NO:{{ account_no }}</span></p>
                                        <p style="margin:0pt 3.55pt 0pt 1pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style'; font-variant:small-caps;   ">IFSC
                                                CODE: {{ ifsc }}</span></p>
                                    </td>
                                </tr>
                                <tr style="height:55.75pt;">
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="10" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style=" text-indent:-18pt; text-align:center; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps; list-style-position:inside;">
                                                <span
                                                    style="width:3.28pt; font:7pt 'Times New Roman'; display:inline-block;"></span>
                                            </li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">List of documents attached to this
                                                claim in order to prove the existence and non</span><span
                                                style="font-family:'Times New Roman';">-</span><span
                                                style="font-family:'Bookman Old Style';">-payment of claim due to the
                                                financial creditor</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <!-- <ol style="margin:0pt; padding-left:0pt;" type="1">
                                        <li
                                            style="margin-left:13.5pt; text-align:justify; line-height:108%; font-family:'Bookman Old Style'; font-size:12pt;">
                                            <a name="_Hlk131429811"><span  >Aadhar
                                                    Card</span></a></li>
                                        <li
                                            style="margin-left:13.5pt; text-align:justify; line-height:108%; font-family:'Bookman Old Style'; font-size:12pt;">
                                            <span  >Cancelled cheque</span></li>
                                        <li
                                            style="margin-left:13.5pt; text-align:justify; line-height:108%; font-family:'Bookman Old Style'; font-size:12pt;">
                                            <span  >Apartment Sale buyers
                                                agreement</span></li>
                                        <li
                                            style="margin-left:13.5pt; text-align:justify; line-height:108%; font-family:'Bookman Old Style'; font-size:12pt;">
                                            <span  >Construction Agreement</span></li>
                                        <li
                                            style="margin-left:13.5pt; text-align:justify; line-height:108%; font-family:'Bookman Old Style'; font-size:12pt;">
                                            <span  >Claim computation sheet</span></li>
                                        <li
                                            style="margin-left:13.5pt; text-align:justify; line-height:108%; font-family:'Bookman Old Style'; font-size:12pt;">
                                            <span  >Copy of reciepts of payment made to
                                                Mantri Developers Pvt Ltd&nbsp;</span></li>
                                        <li
                                            style="margin-left:13.5pt; text-align:justify; line-height:108%; font-family:'Bookman Old Style'; font-size:12pt;">
                                            <span  >Statement of account provided by
                                                Mantri Developers&nbsp;</span></li>
                                    </ol> -->
                                        <span v-html="attachmentsList">

                                        </span>
                                        <p
                                            style="margin-top:0pt; margin-left:10.55pt; margin-bottom:0pt; text-align:justify; line-height:108%; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr style="height:20.8pt;">
                                    <td
                                        style="width:4pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <ol start="11" style="margin:0pt; padding-left:0pt;" type="1">
                                            <li
                                                style=" text-indent:-18pt; text-align:center; font-family:'Bookman Old Style'; font-size:12pt; font-variant:small-caps; list-style-position:inside;">
                                                <span
                                                    style="width:3.28pt; font:7pt 'Times New Roman'; display:inline-block;"></span>
                                            </li>
                                        </ol>
                                    </td>
                                    <td
                                        style="width:172.95pt; border-style:solid; border-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 5pt 0pt 5.6pt; text-align:justify; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Name of the Insolvency Professional
                                                who will act as the Authorised Representative of the creditors of the
                                                class&nbsp;</span></p>
                                    </td>
                                    <td
                                        style="width:266.1pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin-top:0pt; margin-left:12.6pt; margin-bottom:0pt; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                                        </p>
                                        <p style="margin-top:0pt; margin-left:12.6pt; margin-bottom:0pt; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">Mr. T Narayna Swamy&nbsp;</span>
                                        </p>
                                        <p
                                            style="margin-top:0pt; margin-right:3.55pt; margin-bottom:6pt; text-align:justify; font-size:12pt;">
                                            <span
                                                style="font-family:'Bookman Old Style'; font-variant:small-caps;">&nbsp;</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3"
                                        style="width:469.95pt; border-top-style:solid; border-top-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                style="font-family:'Times New Roman';">(</span><span
                                                style="font-family:'Bookman Old Style';">Signature of financial creditor or
                                                person authorised to act on his behalf</span><span
                                                style="font-family:'Times New Roman';">)</span></p>
                                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <span style="font-family:'Times New Roman';">[</span><span
                                                style="font-family:'Bookman Old Style';">please enclose the authority if
                                                this is being submitted on behalf of the financial creditor</span><span
                                                style="font-family:'Times New Roman';">]</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr style="height:23.35pt;">
                                    <td colspan="3"
                                        style="width:469.95pt; border-top-style:solid; border-top-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">Name in BLOCK
                                                LETTERS-</span><span
                                                style="font-family:'Bookman Old Style';">&nbsp;&nbsp;</span><span
                                                style="font-family:'Bookman Old Style';">:&nbsp;</span><span
                                                style="font-family:'Bookman Old Style';   ">{{
                                                    nameAllotee }}</span><span
                                                style="font-family:'Bookman Old Style';   ">&nbsp;&nbsp;</span><span
                                                style="font-family:'Bookman Old Style';   ">&amp;
                                                {{ nameCoAllotee }}</span><span
                                                style="font-family:'Bookman Old Style';">&nbsp;</span>
                                        </p>
                                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <strong><span style="font-family:'Bookman Old Style';">&nbsp;</span></strong>
                                        </p>
                                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3"
                                        style="width:469.95pt; border-top-style:solid; border-top-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin:0pt 3.3pt 0pt 2pt; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Position with or in relation to
                                                creditor - SELF</span></p>
                                        <p style="margin:0pt 3.3pt 0pt 2pt; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3"
                                        style="width:469.95pt; border-top-style:solid; border-top-width:0.75pt; padding-right:1.12pt; padding-left:1.12pt; vertical-align:top;">
                                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><span
                                                style="font-family:'Bookman Old Style';">Address of person signing
                                                </span><span style="font-family:'Times New Roman';   ">{{  address}}</span></p>
                                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:12pt;">
                                            <strong><span style="font-family:'Bookman Old Style';">&nbsp;</span></strong>
                                        </p>
                                        <p style="margin-top:0pt; margin-right:3.3pt; margin-bottom:0pt; font-size:12pt;">
                                            <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal; font-size:12pt;">
                        <strong><span style="font-family:'Times New Roman'; font-variant:small-caps;">*</span></strong><span
                            style="font-family:'Bookman Old Style';">PAN number, passport, Aadhaar card or the identity card
                            issued by the Election Commission of India</span><span
                            style="font-family:'Times New Roman';">.</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; line-height:normal; font-size:12pt;"><strong><span
                                style="font-family:'Bookman Old Style';">&nbsp;</span></strong></p>
                    <p style="margin-top:0pt; margin-bottom:8pt; line-height:108%; font-size:12pt;"><strong><span
                                style="font-family:'Bookman Old Style';">&nbsp;</span></strong></p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:normal; font-size:12pt;">
                        <strong><span style="font-family:'Bookman Old Style';">DECLARATION</span></strong>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:normal; font-size:12pt;">
                        <strong><span style="font-family:'Bookman Old Style';">&nbsp;</span></strong>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; line-height:normal; font-size:12pt;"><span
                            style="font-family:'Bookman Old Style';">I,&nbsp;</span><span
                            style="font-family:'Bookman Old Style';   ">{{ nameAllotee }} &amp;
                            {{ nameCoAllotee }}</span><span style="font-family:'Bookman Old Style';">, currently residing
                            at&nbsp;</span><span style="font-family:'Times New Roman';   ">{{ address}}</span><span style="font-family:'Times New Roman';">,
                            India,&nbsp;</span><span style="font-family:'Bookman Old Style';">do hereby declare and state as
                            follows</span><span style="font-family:'Times New Roman';">: -&nbsp;</span></p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <ol style="margin:0pt; padding-left:0pt;" type="1">
                        <li
                            style="margin-left:14pt; text-align:justify; line-height:normal; padding-left:4pt; font-family:'Book Antiqua'; font-size:12pt; font-weight:bold;">
                            <span style="font-family:'Bookman Old Style'; font-weight:normal;">Mantri Developers Pvt Ltd
                                corporate debtor was, at the insolvency commencment date, being the 28.03.{{ newyear }},
                                actually indebted to me for a sum of</span><span
                                style="font-family:'Bookman Old Style';">&nbsp;Rs.&nbsp;</span><span>{{ Number(principalAmt)
                                    + Number(interest) +
                                    Number(othercharges) }}</span> <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                        </li>
                        <li
                            style="margin-left:16.28pt; text-align:justify; line-height:normal; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                            In respect of my claim of the said sum or any part thereof, I have relied on the documents
                            specified below <span style="font-family:'Times New Roman';">[</span>Please list the documents
                            relied on as evidence of claim<span style="font-family:'Times New Roman';">]:</span></li>
                    </ol>
                    <ol style="margin:0pt; padding-left:0pt;" type="1">


                        <span v-html="attachmentsList"></span>

                    </ol>


                    <!-- </span> -->
                    <p
                        style="margin-top:0pt; margin-left:72pt; margin-bottom:0pt; text-align:justify; line-height:normal; font-size:12pt;">
                        <span dir="rtl" style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <ol start="3" style="margin:0pt; padding-left:0pt;" type="1">
                        <li
                            style="margin-left:16.28pt; text-align:justify; line-height:normal; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                            The said documents are true, valid and genuine to the best of my knowledge, information and
                            belief and no material facts have been concealed therefrom<span
                                style="font-family:'Times New Roman';">.</span></li>
                        <li
                            style="margin-left:16.28pt; margin-bottom:14pt; text-align:justify; line-height:normal; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                            In respect of the said sum or any part thereof, neither I, nor any person, by my order, to my
                            knowledge or belief, for my use, had or received any manner of satisfaction or security
                            whatsoever, save and except the following<span
                                style="font-family:'Times New Roman';">:&nbsp;</span>Not Applicable<span
                                style="font-family:'Times New Roman';">.</span></li>
                    </ol>
                    <p
                        style="margin-top:0pt; margin-left:18pt; margin-bottom:14pt; text-align:justify; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Times New Roman';">[</span><span
                            style="font-family:'Bookman Old Style';">Please state details of any mutual credit, mutual
                            debts, or other mutual dealings between the corporate debtor and the creditor which may be
                            set</span><span style="font-family:'Times New Roman';">-</span><span
                            style="font-family:'Bookman Old Style';">off against the claim</span><span
                            style="font-family:'Times New Roman';">].</span>
                    </p>
                    <ol start="5" style="margin:0pt; padding-left:0pt;" type="1">
                        <li
                            style="margin-left:16.28pt; text-align:justify; line-height:normal; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                            I am not a related party of the corporate debtor, as defined under Section 5 <span
                                style="font-family:'Times New Roman';">(</span>24<span
                                style="font-family:'Times New Roman';">)&nbsp;</span>of the code<span
                                style="font-family:'Times New Roman';">.</span></li>
                        <li
                            style="margin-left:16.28pt; margin-bottom:14pt; text-align:justify; line-height:normal; padding-left:1.72pt; font-family:'Bookman Old Style'; font-size:12pt;">
                            I am eligible to give voting instructions to the authorized representative by virtue of proviso
                            to Section 21 <span style="font-family:'Times New Roman';">(</span>2<span
                                style="font-family:'Times New Roman';">)&nbsp;</span>of the code even though I am a related
                            party of the corporate debtor<span style="font-family:'Times New Roman';">.</span></li>
                    </ol>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">Date</span><span
                            style="font-family:'Times New Roman';">: {{ currentDate }}</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">Place</span><span
                            style="font-family:'Times New Roman';">: Bengalore&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Times New Roman';">(</span><span
                            style="font-family:'Bookman Old Style';">Signature of the Claimants</span><span
                            style="font-family:'Times New Roman';">)</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; line-height:normal; font-size:12pt;"><span
                            style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:normal; font-size:12pt;">
                        <strong><span style="font-family:'Bookman Old Style';">VERIFICATION</span></strong>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">I/ We,&nbsp;</span><span
                            style="font-family:'Bookman Old Style';   ">{{ nameAllotee }} &amp;
                            {{ nameCoAllotee }}</span><span style="font-family:'Bookman Old Style';">&nbsp;the claimant
                            hereinabove, do hereby verify that *** contents of this proof of claim are true and correct to
                            my/our knowledge and belief and no material fact has been concealed therefrom</span><span
                            style="font-family:'Times New Roman';">.&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; line-height:normal; font-size:12pt;"><span
                            style="font-family:'Bookman Old Style';">Verified at Bangalore on this {{ currentDate }}</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; line-height:normal; font-size:12pt;"><span
                            style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                    <p style="margin-top:0pt; margin-bottom:0pt; line-height:normal; font-size:12pt;"><span
                            style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                    <p style="margin-top:0pt; margin-bottom:0pt; line-height:normal; font-size:12pt;"><span
                            style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                    <p style="margin-top:0pt; margin-bottom:0pt; line-height:normal; font-size:12pt;"><span
                            style="font-family:'Bookman Old Style';">&nbsp;</span></p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span><span
                            style="font-family:'Times New Roman';">(</span><span
                            style="font-family:'Bookman Old Style';">Signature of the Claimants</span><span
                            style="font-family:'Times New Roman';">)</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Bookman Old Style';">&nbsp;</span>
                    </p>
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal; font-size:12pt;">
                        <span style="font-family:'Times New Roman';">[</span><strong><span
                                style="font-family:'Bookman Old Style';">Note</span></strong><span
                            style="font-family:'Times New Roman';">:&nbsp;</span><span
                            style="font-family:'Bookman Old Style';">in the case of company or limited liability
                            partnership, the declaration and verification shall be made by the director</span><span
                            style="font-family:'Times New Roman';">/</span><span
                            style="font-family:'Bookman Old Style';">manager</span><span
                            style="font-family:'Times New Roman';">/</span><span
                            style="font-family:'Bookman Old Style';">secretary</span><span
                            style="font-family:'Times New Roman';">/</span><span
                            style="font-family:'Bookman Old Style';">designated partner and in the case of other entities,
                            an officer authorized for the purpose by the entity</span><span
                            style="font-family:'Times New Roman';">.]</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
//   document.getElementById('authorize_button').style.visibility = 'hidden';
//   document.getElementById('signout_button').style.visibility = 'hidden';

export default {
    components: {
        quillEditor,
    },
    data() {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const date = new Date()
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return {
            editorOption: {
                modules: {
                    toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
                },
                placeholder: 'Enter Description',
            },
            attachmentsList: "",
            newDate: date.getDate(),
            newyear: year,
            newday: day,
            newmonth: month,
            currentDate: `${day} ${month} , ${year}`,
            nameAllotee: "",
            addhar: "",
            address: '',
            email: '',
            phone: '',
            flat: "",
            tower: "",
            area: "",
            nameCoAllotee: "",
            addharCo: "",
            principalAmt: "",
            interest: "",
            othercharges: "",
            account_no: "",
            ifsc: "",
            bank_branch: "",
            type: "",


        }
    },
    methods: {
        fun() {

        },
        Export2Word(element, filename = '') {
            const date = new Date()

            var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
            var postHtml = "</body></html>";
            var preHtml = ""
            var html = preHtml + document.getElementById(element).innerHTML + postHtml;

            var blob = new Blob(['\ufeff', html], {
                type: 'application/msword'
            });

            // Specify link url
            var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

            // Specify file name
            filename = filename ? filename + '.doc' : 'document.doc';

            // Create download link element
            var downloadLink = document.createElement("a");

            document.body.appendChild(downloadLink);

            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                // Create a link to the file
                downloadLink.href = url;

                // Setting the file name
                downloadLink.download = filename;

                //triggering the function
                downloadLink.click();
            }

            document.body.removeChild(downloadLink);
        },
        
    },
}
</script>