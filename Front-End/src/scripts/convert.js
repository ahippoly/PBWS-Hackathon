const fs = require('fs')

// Read JSON file
fs.readFile('list_diploma.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  // Parse JSON data
  const jsonData = JSON.parse(data)

  // Map JSON data to TypeScript interface
  const tsData = jsonData.map((student) => {
    return {
      id: '',
      firstName: student.Name.split(' ')[0],
      lastName: student.Name.split(' ')[1] || '',
      email: '',
      dateOfBirth: '',
      imgBase64: student['profile image'],
      walletAddress: student['Wallet Address'],
    }
  })

  fs.writeFile('Students.mock.ts', JSON.stringify(tsData, null, 2), (err) => {
    if (err) {
      console.error(err)
    }
  })

  console.log(tsData)
})
