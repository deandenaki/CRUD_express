const form = document.getElementById('form')
const inputMessage = document.getElementById('inputMessage')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!inputMessage.value.trim()) {
        window.alert('message is empty')
        return
    }

    form.submit()
})

async function getData() {
    try {
        //get data
        const data = await fetch('http://localhost:3000/api', { method: 'GET' })
        const json = await data.json()

        //get ul
        const ul = document.getElementById('data')
        ul.className = 'w-full flex flex-col justify-between'

        //foreaching data
        json.forEach(data => {
            //create li element
            const li = document.createElement('li')
            li.className = 'w-full flex justify-between'

            //create p element
            const p = document.createElement('p')
            p.innerText = data.message
            p.className = 'w-full flex items-center'

            //create input element
            const input = document.createElement('input')
            input.className = 'w-full editing hidden'
            input.name = 'message'
            input.value = data.message

            //create delete button element
            const delBtn = document.createElement('button')
            delBtn.innerText = 'Delete'
            delBtn.className = 'bg-red-500 py-1 px-2 my-2 text-white rounded-2xl ml-3'

            //onclick event
            delBtn.onclick = async () => {
                try {
                    await fetch(`http://localhost:3000/delete/${data.id}`, {
                        method: 'DELETE'
                    })
                    li.remove()
                } catch (err) {
                    console.error('cannot delete: ', err)
                }
            }

            //create cancel button element
            const cancelBtn = document.createElement('button')
            cancelBtn.innerText = 'Cancel'
            cancelBtn.className = 'bg-gray-500 py-1 px-2 my-2 text-white rounded-2xl ml-3 hidden'

            //create save button element
            const saveBtn = document.createElement('button')
            saveBtn.innerText = 'Save'
            saveBtn.className = 'bg-green-500 py-1 px-2 my-2 text-white rounded-2xl ml-3 hidden'
            saveBtn.onclick = async () => {
                try {
                    await fetch(`http://localhost:3000/update/${data.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ message: input.value })
                    })

                    p.innerText = input.value

                    input.classList.add('hidden')
                    cancelBtn.classList.add('hidden')
                    saveBtn.classList.add('hidden')
                    p.classList.remove('hidden')
                    editBtn.classList.remove('hidden')

                } catch (err) {
                    console.error('cannot update data front: ', err)
                }
            }

            //by default cancel button and input are hidden

            //cancel button event
            cancelBtn.onclick = () => {
                // Restore original state
                input.classList.add('hidden')
                cancelBtn.classList.add('hidden')
                saveBtn.classList.add('hidden')
                p.classList.remove('hidden')
                editBtn.classList.remove('hidden')

                input.value = data.message
            }

            //create edit button element
            const editBtn = document.createElement('button')
            editBtn.innerText = 'Edit'
            editBtn.className = 'bg-blue-500 py-1 px-2 my-2 text-white rounded-2xl ml-3'

            //edit button event
            editBtn.onclick = () => {
                // Close other open edits
                const activeInput = document.querySelector('input.editing:not(.hidden)')
                if (activeInput) {
                    activeInput.classList.add('hidden')
                    activeInput.parentElement.querySelector('p').classList.remove('hidden')
                    // activeInput.parentElement.querySelector('button:contains("Cancel")')?.classList.add('hidden')
                    // activeInput.parentElement.querySelector('button:contains("Edit")')?.classList.remove('hidden')
                }

                // Switch to input mode
                input.classList.remove('hidden')
                cancelBtn.classList.remove('hidden')
                saveBtn.classList.remove('hidden')
                p.classList.add('hidden')
                editBtn.classList.add('hidden')
            }

            // Append everything
            li.appendChild(p)
            li.appendChild(input)
            li.appendChild(editBtn)
            li.appendChild(saveBtn)
            li.appendChild(cancelBtn)
            li.appendChild(delBtn)
            ul.appendChild(li)

        });
    } catch (err) {
        console.error('failed to fetch: ' + err)
    }
}

getData()