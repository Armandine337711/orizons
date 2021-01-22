import React, { useState } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './subscribe.scss';
import axios from 'axios';

const Subscribe = ({ history }) => {
  const [inputs, setInputs] = useState({
    nickname: '',
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const {
    nickname, lastname, firstname, email, password, passwordRepeat,
  } = inputs;

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  // Hook qui vient de React Hook Form
  // https://react-hook-form.com/get-started
  const {
    register, handleSubmit, errors,
  } = useForm({});
  // on cherche à voir si le serveur a bien reçu les infos
  const [submitting, setSubmitting] = useState(false);
  // réussite de la requête
  const [successful, setSuccessful] = useState(false);
  // message envoyé à l'utilisateur
  const [message, setMessage] = useState('');

  return (
    <>
      <h1 className="text-center p-4 font-weight-bold">Inscris-toi pour créer ton premier carnet !</h1>
      <Container className="d-flex justify-content-center align-items-center">
        <Form
          className="form"
          onSubmit={handleSubmit((formData) => {
            // on récupère un objet avec toutes les données. Envoyées seulement si correctes
            setSubmitting(true);
            // eslint-disable-next-line no-console
            console.log('formData', formData);
            const config = {
              method: 'post',
              // test avec le serveur de 'Recipes'
              url: 'https://orizons.herokuapp.com/members',
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                first_name: formData.firstname,
                last_name: formData.lastname,
                password: formData.password,
                nickname: formData.nickname,
                email: formData.email,
              },
            };
            axios(config)
              .then((response) => {
                // eslint-disable-next-line no-console
                console.log(response.data);
                setMessage(response.data.data);
                setSuccessful(true);
                history.push('/connexion');
              })
              .catch((error) => {
                const resMessage = (error.response
                    && error.response.data
                    && error.response.data.message)
                  || error.message
                  || error.toString();
                setMessage(resMessage);
                setSuccessful(false);
              })
              .finally(() => {
                setSubmitting(false);
              });
          })}
        >
          {message && (
          <div
            className={successful ? 'alert alert-success' : 'alert alert-danger'}
            role="alert"
          >
            {message}
          </div>
          )}
          <Form.Group size="lg" controlId="nickname">
            <Form.Label>Pseudonyme</Form.Label>
            <Form.Control
              autoFocus
              name="nickname"
              type="text"
              defaultValue={nickname}
              onChange={(e) => handleChange(e)}
              // on attache notre input au React Hook Form pour les critères de validation
              ref={register({
                // si le champ n'est pas rempli lors de la soumission, le champ se met en focus
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.nickname && <div className="text-danger mb-2">{errors.nickname.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="lastname">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              autoFocus
              name="lastname"
              type="text"
              defaultValue={lastname}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.lastname && <div className="text-danger">{errors.lastname.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="first_name">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              autoFocus
              name="firstname"
              type="text"
              defaultValue={firstname}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.firstname && <div className="text-danger">{errors.firstname.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              autoFocus
              name="email"
              type="email"
              defaultValue={email}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              autoFocus
              name="password"
              type="password"
              defaultValue={password}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
                minLength: {
                  value: 8,
                  message: 'Ce champ doit contenir au moins 8 caractères',
                },
                validate: (value) => (
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value)) || 'Ce champ doit contenir au moins une majuscule, une minuscule et un caractère spécial'
                ),
              })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="password-repeat">
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control
              autoFocus
              name="passwordRepeat"
              type="password"
              defaultValue={passwordRepeat}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
                validate: (value) => value === password || 'Veuillez entrer le même mot de passe',
              })}
            />
            {errors.passwordRepeat && <div className="text-danger">{errors.passwordRepeat.message}</div>}
          </Form.Group>
          {/* A la soumission du form, en attente de la réponse serveur le bouton est désactivé */}
          <Button block size="lg" className="mt-3" type="submit" disabled={submitting}>
            Valider
          </Button>
        </Form>
      </Container>
      <p className="text-center m-3">Vous êtes déjà inscrit ? <Link to="/connexion">Connectez-vous !</Link></p>
    </>
  );
};

export default Subscribe;