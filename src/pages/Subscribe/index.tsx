import { gql, useMutation } from '@apollo/client';
import { Warning } from 'phosphor-react';
import { FormEventHandler, FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`;

const PUBLISH_SUBSCRIBER_MUTATION = gql`
  mutation PublishSubscriber($id:ID!) {
    publishSubscriber(where: {id: $id}) {
      id
    }
  }
`;

type CreateSubscribeMutationResponse = {
  createSubscriber: {
    id: string,
  },
};

const SubscribePage: FunctionComponent = function () {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [ createSubscriber, { loading: loadingCreateSubscriber, error: errorCreateSubscriber } ] = useMutation<CreateSubscribeMutationResponse>(CREATE_SUBSCRIBER_MUTATION);
  const [ publishSubscriber, { loading: loadingPublishSubscriber, error: errorPublishSubscriber } ] = useMutation(PUBLISH_SUBSCRIBER_MUTATION);

  const handleSubscribe:FormEventHandler<HTMLFormElement> = function (event) {
    event.preventDefault();
    createSubscriber({
      variables: {
        name,
        email,
      }
    })
    .then(function (response) {
      const id = response.data?.createSubscriber.id
      publishSubscriber({
        variables: {
          id
        }
      })
      .then(function () {
        navigate('/event');
      });
      
    });
  };

  return (
    <div className='min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center'>
      <div className='w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto'>
        <div className='max-w-[640px]'>
          <Logo />
          <h1 className='mt-8 text-[2.5rem] leading-tight'>
            Construa uma <strong className='text-blue-500'>aplicação completa</strong>, do zero, com <strong className='text-blue-500'>React</strong>
          </h1>
          <p className='mt-4 text-gray-200 leading-relaxed'>
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>
        <div className='p-8 bg-gray-700 border border-gray-500, rounded'>
          <strong className='text-2xl mb-6 block'>Inscreva-se gratuitamente</strong>
          {(errorCreateSubscriber || errorPublishSubscriber) && (
            <p className='text-sm text-yellow-500 px-4 pb-8 flex items-center gap-2'>
              <Warning size={24} /> Opa! Tente outro e-mail.
            </p>
          )}
         
          <form className='flex flex-col gap-2 w-full' onSubmit={handleSubscribe}>
            <input
              className='bg-gray-900 rounded px-5 h-14'
              type='text'
              placeholder='Seu nome completo'
              onChange={e => setName(e.target.value)}
            />
            <input
              className='bg-gray-900 rounded px-5 h-14'
              type='email'
              placeholder='Digite seu e-mail'
              onChange={e => setEmail(e.target.value)}
            />
            {(loadingCreateSubscriber || loadingPublishSubscriber) ? (
              <button className='mt-4 bg-green-900 uppercase py-4 rounded font-bold text-sm flex justify-center' disabled>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </button>
            ) : (
              <button className='mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors'>Garantir minha vaga</button>
            )}
          </form>
        </div>
      </div>
      <img src='/src/assets/code-mockup.png' alt='Code mockup' className='mt-10' />
    </div>
  );
};


export default SubscribePage;