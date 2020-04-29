import React, { useState } from 'react';

import addToMailChimp from 'gatsby-plugin-mailchimp';

import { Form } from '@gabrieluizramos/preferences/components';
import schema from './schema';

import * as S from './styles';

const messages = {
  success: 'Prontinho! Agora é só confirmar sua inscrição no email que você vai receber em instantes.',
  error: 'Ops! Parece que que tivemos algum erro... Por favor, tente novamente.',
  warning: 'Você deve ter recebido um email para confirmar sua inscrição. Caso não receba, tente novamente em alguns instantes por favor.'
}

const Newsletter = () => {
  const [result, setResult] = useState('');
  const [sending, setSending] = useState(false);

  const getPathName = () => window.location.pathname;

  const subscribe = ({
    FNAME,
    email,
    pathname = getPathName()
  }) => addToMailChimp(email, { FNAME, pathname })

  const onSubmit = async (values) => {
    setSending(true);
    try {
      const { result } = await subscribe(values);
      setResult(result);
    } catch (err) {
      setResult('warning');
    }
    setSending(false);
  };

  const renderMessage = () => result && !sending && (
    <S.Message type={result}>
      {messages[result]}
    </S.Message>
  );

  return (
    <>
      <hr />
      <S.Newsletter>
        <S.Title>
          Assine a Newsletter!
        </S.Title>
        <S.Text>
          Assim você recebe por email as novidades :)
        </S.Text>
        <S.Form>
          <Form schema={schema} onSubmit={onSubmit} disabled={sending} />
        </S.Form>
        {renderMessage()}
      </S.Newsletter>
    </>
  );
};

export default Newsletter;
