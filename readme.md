# Scan and Go

Scan and Go is a web application developed using React and Firebase. Its primary purpose is to streamline and modernize the process of student check-ins at college libraries. Instead of manually entering names in a register, the application utilizes QR code technology to automate and digitize the process.

## Working App can be found here

https://scan-and-go-web.vercel.app/

## Features

- Scan QR codes quickly and easily
- Store scanned data in the cloud database
- User-friendly interface

## Technologies

- React
- Firebase
- Chakra UI
- Javascript

## How it Works

The Scan and Go application works in the following way:

1. The user launches the web app and opens the scanner
2. The user points the scanner at the QR code
3. The app captures the QR code data and sends it to the Firebase database
4. The Firebase database stores the data in real-time
5. The user can view the stored data in real-time

## Problem it solves

The problem that this solution solves is the time-consuming and outdated process of manually entering names in a register when students visit their college library. This process is not only tedious but also prone to errors and inaccuracies. The proposed QR code-based solution simplifies the process by allowing students to quickly scan a code upon entering the library, which automatically records their entry in a digital database. This eliminates the need for manual entry, reduces the risk of errors, and streamlines the overall process.

Another significant advantage of the proposed QR code-based solution is that it significantly reduces paper wastage. With the manual register system, each student entry requires a new page, and the registers can fill up quickly, leading to the consumption of a large amount of paper. However, with the QR code system, all the entry records are stored in a digital database, eliminating the need for physical paper records. This not only saves paper but also helps in the conservation of natural resources and reduces the environmental impact of the library.

### Now, you might be wondering how the colleges would generate a unique QR code?

To do that I have developed a [QR code generator](https://github.com/chetan-2002/QRGenerator) , where the college library admin has to just enter some credentials and it would generate a unique QR code for them.After that the work is easy , just download that QR Code, print it , and thats it.

## Understanding Impact of the Solution

### Assumptions:

1. One college uses an average of 3 pages per day for library attendance tracking.
2. There are approximately 39,000 colleges in India.
3. Colleges work for 200 days in a year.

### Calculation:

1. Total number of pages used per day = 3 pages x 39,000 colleges = 117,000 pages per day
2. Total number of pages used per year = 117,000 pages per day x 200 days = 23,400,000 pages per year
3. Assuming that a standard A4 sheet weighs approximately 4.5 grams, the total amount of paper used per year would be: 23,400,000 pages x 4.5 grams per page = 105,300,000 grams of paper per year or 105.3 metric tons of paper per year.
4. If we assume that one tree can produce approximately 16.67 reams of A4 paper, and each ream contains 500 sheets, then we can estimate that 105.3 metric tons of paper would require approximately 634 trees to produce.

## Project Walkthrough Video

https://user-images.githubusercontent.com/77783033/227759411-538d8330-2c32-4df1-89ba-52bde8e3d206.mp4

## Conclusion:

Implementing a QR code-based system for library attendance tracking in colleges across India could potentially save up to 23,400,000 pages of paper per year, which translates to approximately 105.3 metric tons of paper or 634 trees annually. These figures demonstrate the significant environmental impact that this solution can have by reducing paper wastage and promoting sustainability in educational institutions, even with a shorter working period of 200 days per year.

## About Me

### Hi there! 👋

I'm [Chetan Thakral](https://github.com/chetan-2002), a Software developer passionate about MERN and React Native Development.

Feel free to check out some of my projects and let me know what you think. I'm always open to collaborating and learning from others.

Let's connect on [Linkedin](https://www.linkedin.com/in/chetan-thakral/)! 💬
