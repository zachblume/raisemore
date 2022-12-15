// Papa parse for csv handling
const Papa = require("papaparse");

// Postgres client
const { Client } = require("pg");

import supabase from "../../utils/supabase";

// Load csv of donations to donation and people table
export default async function loadDonationsCSV(req, res) {
  // Get fileName from request query variable
  const {
    query: { fileName },
    method,
  } = req;

  console.log(fileName);

  // Get the file from supabase storage
  const { data: fileBlob, error } = await supabase.storage
    .from("public/imports")
    .download(fileName);
  const rawContent = await fileBlob.text();
  console.log(rawContent);

  // Store a signed URL to pass to PG as fileURL
  const {
    data: { publicUrl: fileURL },
  } = await supabase.storage.from("imports").getPublicUrl(fileName);

  console.log(fileURL);

  // Data is the JSON, fields is an array of headers
  const {
    data: FilePasedToJSON,
    // meta: { fieldsb },
  } = Papa.parse(rawContent, { header: true, skipEmptyLines: true });

  // Using .env PGHOST, PGPGPASSWORD, etc instead of var config={};
  const client = new Client(); // config

  // Open PG connection
  await client.connect();

  // Use COPY to load csv to table
  const response = await client.query(
    `COPY testtable(text)
    FROM PROGRAM 'curl "${fileURL}"'
    DELIMITER ','
    CSV HEADER;`
  );

  console.log(response);

  // next js test lines
  res.status(200).send();
  return;

  // Copy

  // // Grab the people collection as an array of rows, and add id to the object
  // const people = [];
  // (await accountDB.collection("people").get()).forEach((a) =>
  //   people.push({ ...a.data(), id: a.id })
  // );
  // const oldPeople = JSON.parse(JSON.stringify(people));

  // // Loop through donation objects
  // for (const donation of data) {
  //   functions.logger.log(donation);

  //   // Does person already exist?
  //   // Lots of possibilities for record linkage but
  //   // let's just find by email to start with.
  //   const existingRecords = people.filter(
  //     (person) => person.email == donation["Donor Email"]
  //   );
  //   const matchingIndex = people.findIndex(
  //     (person) => person.email == donation["Donor Email"]
  //   );

  //   // Email isn't unique! Throw error
  //   if (existingRecords.length > 1)
  //     throw new Error("Email should be unique but was not", {
  //       accountID: accountID,
  //       donationID: donation["Lineitem ID"],
  //     });

  //   // Create an object to hold new information
  //   const newPerson = newPersonFromDonationObject(donation);

  //   // If the donor already exists, grab existing id
  //   let personID;
  //   if (existingRecords.length > 0) {
  //     personID = existingRecords[0].id;
  //     // await accountDB.collection('people').doc(personID).set(newPerson);

  //     // Record a change a differnt way
  //     people[matchingIndex] = JSON.parse(
  //       JSON.stringify({ ...newPerson, id: personID })
  //     );
  //   } else {
  //     // If the donor doesn't already exist, we want to create someone!
  //     // personID = (await accountDB.collection('people').add(newPerson)).id;
  //     personID = uuid();
  //     // Record a change a differnt way
  //     people.push(JSON.parse(JSON.stringify({ ...newPerson, id: personID })));
  //   }

  //   accountDB
  //     .collection("donations")
  //     .doc(donation["Lineitem ID"])
  //     .update({ personID: personID });
  // }

  // // Diff to figure out changes
  // // people versus oldPeople
  // const differences = people.filter((x) => {
  //   for (const person of oldPeople) {
  //     if (JSON.stringify(person) === JSON.stringify(x)) return false;
  //   }
  //   return true;
  // });

  // // Write donations to firstore simultaneously
  // const peopleInsertResults = await Promise.all(
  //   differences.map((row) =>
  //     accountDB
  //       .collection("people")
  //       .doc(row["id"])
  //       .set(_.omit(row, ["id"]))
  //   )
  // );
  // peopleInsertResults; // Shh linter

  // // End handleDonationsCSVImport()
}
