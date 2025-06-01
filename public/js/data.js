const form = document.getElementById('form')
const inputMessage = document.getElementById('inputMessage')
const ul = document.getElementById('data')

//delete data function
async function deleteData(id, li) {
    try {
        await fetch(`http://localhost:3000/delete/${id}`, {
            method: 'DELETE'
        })
        li.remove()
    } catch (err) {
        console.error('cannot delete: ', err)
    }
}

//edit data function
async function editData(id, input) {
    try {
        await fetch(`http://localhost:3000/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: input.value })
        })

    } catch (err) {
        console.error('cannot update data front: ', err)
    }
}

//fetch data
async function getData() {
    try {
        //get data
        const data = await fetch('http://localhost:3000/api', { method: 'GET' })
        const json = await data.json()

        //foreaching data
        json.forEach(data => {
            //create li element
            const li = document.createElement('li')
            li.className = 'w-full flex justify-between'

            //create p element
            const text = document.createElement('p')
            text.innerText = data.message
            text.className = 'w-full flex items-center'

            //create input element
            const input = document.createElement('input')
            input.className = 'w-full editing hidden'
            input.name = 'message'
            input.value = data.message

            //create delete button element
            const deleteButton = document.createElement('button')
            deleteButton.innerText = 'Delete'
            deleteButton.className = 'bg-red-500 py-1 px-2 my-2 text-white rounded-2xl ml-3'

            //onclick event
            deleteButton.onclick = () => deleteData(data.id, li)

            //create cancel button element
            const cancelButton = document.createElement('button')
            cancelButton.innerText = 'Cancel'
            cancelButton.className = 'bg-gray-500 py-1 px-2 my-2 text-white rounded-2xl ml-3 hidden'

            //create save button element
            const saveButton = document.createElement('button')
            saveButton.innerText = 'Save'
            saveButton.className = 'bg-green-500 py-1 px-2 my-2 text-white rounded-2xl ml-3 hidden'
            saveButton.onclick = () => {

                editData(data.id, input)

                text.innerText = input.value

                input.classList.add('hidden')
                cancelButton.classList.add('hidden')
                saveButton.classList.add('hidden')
                text.classList.remove('hidden')
                editButton.classList.remove('hidden')
            }

            //by default cancel button and input are hidden

            //cancel button event
            cancelButton.onclick = () => {
                input.classList.add('hidden')
                cancelButton.classList.add('hidden')
                saveButton.classList.add('hidden')
                text.classList.remove('hidden')
                editButton.classList.remove('hidden')

                input.value = text.innerText
            }

            //create edit button element
            const editButton = document.createElement('button')
            editButton.innerText = 'Edit'
            editButton.className = 'bg-blue-500 py-1 px-2 my-2 text-white rounded-2xl ml-3'

            //edit button event
            editButton.onclick = () => {
                // Switch to input mode
                input.classList.remove('hidden')
                cancelButton.classList.remove('hidden')
                saveButton.classList.remove('hidden')
                text.classList.add('hidden')
                editButton.classList.add('hidden')
            }

            // Append everything
            li.appendChild(text)
            li.appendChild(input)
            li.appendChild(editButton)
            li.appendChild(saveButton)
            li.appendChild(cancelButton)
            li.appendChild(deleteButton)
            ul.appendChild(li)

        });
        
    } catch (err) {
        console.error('failed to fetch: ' + err)
    }
}

getData()