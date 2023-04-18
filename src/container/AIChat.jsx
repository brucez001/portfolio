import { Configuration, OpenAIApi } from 'openai'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import sendIcon from '../assets/sendIcon.svg';

const ROLE = {
  user: 'user',
}

const GTP_MODEL = 'gpt-3.5-turbo'

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY
}))

function AIChat() {

  const [input, setInput] = useState('')
  const [botMsg, setBotMsg] = useState(null)
  const [messages, setMessages] = useState([])
  

  const getResponse = async () => {
    const curMessages = messages
    // add current input
    curMessages.push({role: ROLE.user, content: input})
    setMessages([...curMessages, {role: 'assistant', content: '...'}])
    setInput('')

    const res = await openai.createChatCompletion({
      model: GTP_MODEL,
      messages: curMessages,
    })
    

    const botMsg = res.data?.choices[0].message || '' // botMsg = {role: 'assistant', content: <content>}
    setBotMsg(botMsg)
  }

  useEffect(() => {
    if (botMsg !== null) {
      const curMessages = messages
      curMessages.pop()
      setMessages([...curMessages, botMsg])
    }
  }, [botMsg])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      getResponse()
    }
  }


  return (
    <>
    <Container>
      <h1>Mock Chat GPT</h1>
      <History>
        {messages.map((message, index) => (
          <MessageRow key={index} role={message.role}>
            <Message>
              <p className='role'>{message.role === ROLE.user ? 'You' : 'Bot'}: </p>
              <p className='content'>{message.content}</p>
            </Message>
          </MessageRow>
        ))}
      </History>
      
    </Container>
    <BottomContainer>
      <InputContainer>
        <textarea 
          rows='1' 
          placeholder='Send a message...' 
          onChange={(e) => setInput(e.target.value)} 
          value={input}
          onKeyDown={handleKeyPress}
        />
        <span onClick={getResponse}>
          <img alt='Send' src={sendIcon} />
        </span>
      </InputContainer>
      <Copyright>Copyright © OpenAI</Copyright>
    </BottomContainer>
  </>
  );
}

export default AIChat;


const Container = styled.div`
  padding: 20px 0;
  background-color: #f6f8fa;
  height: calc(100vh - 50px);

  h1 {
    text-align: center;
  }

  // &::-webkit-scrollbar {
  //   display: none;
  // }
  overflow: scroll;

`


const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  textarea {
    width: 50% !important;
    font-size: 1.1rem;
    padding: 10px;
    max-height: 100px;
    min-height: 1.3rem;
  }

  span {
    margin-left: 10px;
    cursor: pointer;

    img {
      width: 25px;
      height: 25px;
    }
  }
`
const BottomContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: #f6f8fa;
`

const History = styled.div`
  margin-bottom: 100px;

`
const MessageRow = styled.div`
  background-color: ${
    ({ role }) => (role === ROLE.user ? 'transparent' : '#d9f1ff')
  };
  padding: 30px 20px;
  display: flex;
  justify-content: center;
`

const Message = styled.div`
  width: 50%;
  display: flex;
  
  .role {
    font-weight: bold;
  }
  .content {
    margin-left: 10px;
  }
`

const Copyright = styled.p`
  text-align: center;
  font-size: 0.8rem;
`