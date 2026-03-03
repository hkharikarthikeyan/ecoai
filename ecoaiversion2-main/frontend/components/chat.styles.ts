import styled from "@emotion/styled"

interface MessageBubbleProps {
  sender: "user" | "bot"
}

export const ChatContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
`

export const ChatToggle = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #4285f4;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }

    svg {
        color: white;
        font-size: 24px;
    }
`

export const ChatBox = styled.div`
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 350px;
    height: 500px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`

export const ChatHeader = styled.div`
    padding: 15px;
    background-color: #4285f4;
    color: white;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        margin: 0;
    }
`

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
`

export const ChatMessages = styled.div`
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const MessageBubble = styled.div<MessageBubbleProps>`
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
    word-wrap: break-word;
    
    ${({ sender }) =>
      sender === "user"
        ? `
        background-color: #e3f2fd;
        margin-left: auto;
        .message-time {
            text-align: right;
        }
    `
        : `
        background-color: #f5f5f5;
        margin-right: auto;
        .message-time {
            text-align: left;
        }
    `}

    .message-text {
        margin-bottom: 4px;
    }

    .message-time {
        font-size: 0.75rem;
        color: #666;
    }
`

export const ChatInput = styled.div`
    padding: 15px;
    display: flex;
    gap: 10px;
    border-top: 1px solid #eee;

    input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
        font-size: 14px;

        &:focus {
            border-color: #4285f4;
        }

        &:disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
        }
    }
`

export const SendButton = styled.button`
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover:not(:disabled) {
        background-color: #3367d6;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`

