import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';

export const SendMessage = () => {

    const [message, setMessage] = useState('');

    const { socket } = useContext(SocketContext);

    const { auth } = useContext(AuthContext);

    const { chatState } = useContext(ChatContext);

    const onChange = (ev) => {
        setMessage(ev.target.value);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (message.length === 0) { return; }
        //* Limpiar el mensaje
        setMessage('');
        // TODO: Emitir un evento de socket para enviar al mensaje
        /* 
        {
            de: // UID del usuario enviando el mensaje
            para: // UID del usuario que recibe el mensaje
            mensaje: // Lo que se quiere enviar
        }
         */
        socket.emit('mensaje-personal', {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje: message,
        });

        // TODO: Hacer el dispatch de el mensaje...
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={message}
                        onChange={onChange}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
