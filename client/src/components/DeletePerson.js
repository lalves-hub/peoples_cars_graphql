import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE } from '../queries/GetPeople'
import { DELETE_PERSON } from '../queries/DeletePerson'

const DeletePerson = ({ id }) => {
    const [deletePerson] = useMutation(DELETE_PERSON, {
        update(cache, { data: { deletePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE });
            const updatedPeople = people.filter(p => p.id !== deletePerson.id);
            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: updatedPeople,
                },
            });
        }

    })
    const handleButtonClickDel = () => {
        let result = window.confirm("Are you sure you want to delete this person's profile?")
        if (result) {
            deletePerson({
                variables: {
                    deletePersonId: id
                }
            })
        }
    }
    return (
        <DeleteOutlined key='delete' onClick={handleButtonClickDel} style={{ color: 'red' }} />
    )
}

export default DeletePerson