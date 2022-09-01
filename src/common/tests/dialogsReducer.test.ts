import {
  dialogsReducer,
  DialogsStateType,
  sendMessage,
} from '../../features/dialogs/dialogsReducer'

let startState: DialogsStateType

beforeEach(
  () =>
    (startState = {
      dialogsData: [
        { id: 1, name: 'Elina Malina', message: 'What? What you doing?!' },
        { id: 2, name: 'Andrey', message: 'What? What you doing?!' },
        { id: 3, name: 'Leon', message: 'What? What you doing?!' },
        { id: 4, name: 'Valera', message: 'What? What you doing?!' },
        { id: 5, name: 'Sasha', message: 'What? What you doing?!' },
      ],

      messagesData: {
        left: [
          {
            id: 1,
            message:
              'What? What you doing?! Lorem ipsum dolor septum sanctum! Error 404 not found!',
          },
          {
            id: 2,
            message:
              'What? What you doing?! Lorem ipsum dolor septum sanctum! Error 404 not found!',
          },
        ],
        right: [
          { id: 1, message: 'Hi' },
          { id: 2, message: 'How are you?' },
          { id: 3, message: 'Hello' },
        ],
      },
    })
)

test('MESSAGE SENT', () => {
  let message = 'Hello there'

  const endState = dialogsReducer(startState, sendMessage(message))

  expect(endState.messagesData.right[3].message).toBe(message)
})
