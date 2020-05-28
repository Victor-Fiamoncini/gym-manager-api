export default {
	users: {
		email: {
			isEmail: 'Por favor, informe um e-mail válido',
			isNotEmpty: 'Por favor, informe um e-mail',
		},
		password: {
			length: 'Senha muito curta',
		},
		birthdate: {
			isDate: 'Formato de data inválido',
		},
		session: {
			unauthorized: 'Sem permissão',
			invalidCredentials: 'Credenciais inválidas',
		},
		notFound: 'Usuário não encontrado',
		alreadyExists: 'Esse usuário já está cadastrado',
	},
}