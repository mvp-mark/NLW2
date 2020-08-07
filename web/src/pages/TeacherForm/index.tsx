import React, { useState, FormEvent } from 'react';
// import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import {useHistory} from 'react-router-dom';


import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';

import './styles.css';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);



    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
        scheduleItems.push();

    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro')
        })
        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        })
    }
    function setScheduleItemValue(position: Number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);

    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição" />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação fisica', label: 'Educação fisica' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },


                            ]}>

                        </Select>
                        <Input
                            name="cost"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                            label="Custo da sua hora por Aula" />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                    <button type="button" onClick={addNewScheduleItem}> + Novo horário</button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-Feira' },
                                            { value: '2', label: 'Terça-Feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-Feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sabado' },
                                        ]}>

                                    </Select>
                                    <Input
                                        name="from"
                                        label="Das"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value
                                        )}
                                        type="time"
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        type="time"
                                    />
                                </div>
                            )
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante! <br />
                        Preencha totos os dados
                    </p>
                        <button type="submit"> Salvar cadastro </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherList;