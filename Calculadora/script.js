// Obtém os elementos da tela da calculadora
const previousOperationText = document.querySelector("#previous-operation"); // Elemento para exibir a operação anterior
const currentOperationText = document.querySelector("#current-operation");   // Elemento para exibir a operação atual
const buttons = document.querySelectorAll("#buttons-container button");      // Botões da calculadora

// Criação da classe da calculadora
class Calculator {
  // O construtor inicializa os elementos da tela e o valor da operação atual
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText; // Define o elemento da operação anterior
    this.currentOperationText = currentOperationText;   // Define o elemento da operação atual
    this.currentOperation = "";                         // Inicializa a operação atual como uma string vazia
  }

  // Função para adicionar dígitos na tela da calculadora
  addDigit(digit) {
    console.log(digit); // Exibe no console o dígito pressionado (útil para depuração)
    
    // Verifica se o número já contém um ponto decimal
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return; // Se o número já tem um ponto, impede de adicionar outro
    }

    // Atualiza o valor da operação atual com o dígito pressionado
    this.currentOperation = digit;
    this.updateScreen(); // Chama a função para atualizar a tela com o novo dígito
  }

  // Função que processa todas as operações da calculadora (+, -, *, /, etc.)
  processOperation(operation) {
    // Verifica se o valor atual está vazio e se a operação não é "C" (limpar)
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Se não estiver vazio, permite alterar a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation); // Troca a operação se necessário
      }
      return; // Sai da função se o valor atual estiver vazio
    }

    // Obtém os valores da operação anterior e atual convertidos para número
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0]; // Valor da operação anterior
    let current = +this.currentOperationText.innerText;                 // Valor da operação atual

    // Processa a operação de acordo com o operador pressionado (+, -, *, ÷)
    switch (operation) {
      case "+": // Soma
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous); // Atualiza a tela com o resultado
        break;
      case "-": // Subtração
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "x": // Multiplicação
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "÷": // Divisão
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL": // Apaga o último dígito
        this.processDelOperator();
        break;
      case "CE": // Limpa a operação atual
        this.processClearCurrentOperator();
        break;
      case "C": // Limpa todas as operações
        this.processClearOperator();
        break;
      case "=": // Calcula o resultado final
        this.processEqualOperator();
        break;
      default:
        return; // Se não for um operador conhecido, não faz nada
    }
  }

  // Função que atualiza os valores exibidos na tela da calculadora
  updateScreen(
    operationValue = null,  // Valor do resultado da operação
    operation = null,       // Operador da operação (+, -, *, ÷)
    current = null,         // Valor atual da operação
    previous = null         // Valor anterior da operação
  ) {
    if (operationValue === null) {
      // Se não houver valor de operação, adiciona o número ao valor atual na tela
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Se o valor anterior for zero, usa o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      
      // Se a operação for "=", exibe o resultado final na tela principal
      if (operation === "=") {
        this.currentOperationText.innerText = operationValue; // Exibe o resultado no visor principal
        this.previousOperationText.innerText = ""; // Limpa o visor da operação anterior
      } else {
        // Caso contrário, exibe o valor anterior com o operador
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = ""; // Limpa o valor atual
      }
    }
  }

  // Função que troca a operação matemática, se houver uma operação em andamento
  changeOperation(operation) {
    const mathOperations = ["x", "-", "+", "÷"]; // Lista de operações válidas

    // Verifica se a operação atual é uma das operações válidas
    if (!mathOperations.includes(operation)) {
      return;
    }

    // Substitui o operador no texto da operação anterior
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Função que apaga o último dígito da operação atual
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1); // Remove o último caractere
  }

  // Função que limpa a operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = ""; // Limpa o visor principal
  }

  // Função que limpa todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";    // Limpa o visor principal
    this.previousOperationText.innerText = "";   // Limpa o visor da operação anterior
  }

  // Função que processa a operação de igualdade (calcula o resultado final)
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1]; // Obtém o operador da operação anterior
    this.processOperation(operation); // Processa a operação
    this.updateScreen(this.previousOperationText.innerText.split(" ")[0], "="); // Exibe o resultado no visor principal
  }
}

// Criação de uma nova instância da calculadora
const calc = new Calculator(previousOperationText, currentOperationText);

// Adiciona um evento de clique para cada botão da calculadora
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText; // Obtém o valor do botão clicado

    // Se o valor for um número ou ponto decimal, adiciona o dígito na tela
    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value); // Adiciona o dígito
    } else {
      // Caso contrário, processa a operação (soma, subtração, etc.)
      calc.processOperation(value);
    }
  });
});
