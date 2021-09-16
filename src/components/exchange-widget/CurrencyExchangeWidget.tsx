import { useEffect, useState } from 'react';
import { Account } from '../../models/Account';
import { currencyExchange, getExchangeRate } from './mock';
import Button from '../shared/button/Button';
import CurrencyExchangeInput from '../shared/currency-exchange-input/CurrencyExchangeInput';
import {
    CashflowArrow,
    ExchangeDescription,
    ExchangeRate,
    StyledCurrencyExchangeWidget,
} from './CurrencyExchangeWidget.styled';
import { AiOutlineStock } from 'react-icons/ai';

enum ExchangeAction {
    SELL = 'sell',
    BUY = 'buy',
}
const defaultInputState = {
    value: '',
    valueAsNumber: 0,
    exceedsBalance: false,
};

interface CurrencyExchangeWidgetProps {
    accounts: Account[];
}
const CurrencyExchangeWidget: React.FC<CurrencyExchangeWidgetProps> = ({ accounts }) => {
    const [firstSelectedAccount, setFirstSelectedAccount] = useState(accounts[0]);
    const [secondSelectedAccount, setSecondSelectedAccount] = useState(accounts[1]);
    const [firstCurrencyInputState, setFirstCurrencyInputState] = useState(defaultInputState);
    const [secondCurrencyInputState, setSecondCurrencyInputState] = useState(defaultInputState);
    const [exchangeAction, setExchangeAction] = useState<ExchangeAction>(ExchangeAction.SELL);
    const [exchangeRate, setExchangeRate] = useState(
        getExchangeRate(firstSelectedAccount.currency, secondSelectedAccount.currency),
    );

    useEffect(() => {
        setExchangeRate(
            getExchangeRate(firstSelectedAccount.currency, secondSelectedAccount.currency),
        );
    }, [firstSelectedAccount, secondSelectedAccount]);

    const firstInputExceedsBalance = (
        exchangeAction: ExchangeAction,
        valueToSubstract: number,
    ): boolean => {
        return (
            exchangeAction === ExchangeAction.SELL &&
            firstSelectedAccount.balance - valueToSubstract < 0
        );
    };
    const secondInputExceedsBalance = (
        exchangeAction: ExchangeAction,
        valueToSubstract: number,
    ): boolean => {
        return (
            exchangeAction === ExchangeAction.BUY &&
            secondSelectedAccount.balance - valueToSubstract < 0
        );
    };

    const onSelectAccount = (
        newAccountId: number,
        previousAccountId: number,
        theOtherAccountId: number,
        setterFunction: (account: Account) => void,
    ) => {
        if (newAccountId === previousAccountId) {
            return;
        }
        if (newAccountId === theOtherAccountId) {
            const aux = firstSelectedAccount;
            setFirstSelectedAccount(secondSelectedAccount);
            setSecondSelectedAccount(aux);
        } else {
            const newSelectedAccount = accounts.find(({ id }) => id === newAccountId);
            newSelectedAccount && setterFunction(newSelectedAccount);
        }
        setFirstCurrencyInputState(defaultInputState);
        setSecondCurrencyInputState(defaultInputState);
    };

    const onCashflowArrowClick = (newExchangeAction: ExchangeAction) => {
        setExchangeAction(newExchangeAction);
        setFirstCurrencyInputState((inputState) => ({
            ...inputState,
            exceedsBalance: firstInputExceedsBalance(newExchangeAction, inputState.valueAsNumber),
        }));
        setSecondCurrencyInputState((inputState) => ({
            ...inputState,
            exceedsBalance: secondInputExceedsBalance(newExchangeAction, inputState.valueAsNumber),
        }));
    };

    const handleFirstCurrencyInputChange = (value: string) => {
        const exhangeValue = currencyExchange(
            Number(value),
            firstSelectedAccount.currency,
            secondSelectedAccount.currency,
        );
        setFirstCurrencyInputState({
            value: value,
            valueAsNumber: Number(value),
            exceedsBalance: firstInputExceedsBalance(exchangeAction, Number(value)),
        });
        setSecondCurrencyInputState({
            value: exhangeValue.toString(),
            valueAsNumber: exhangeValue,
            exceedsBalance: secondInputExceedsBalance(exchangeAction, exhangeValue),
        });
    };

    const handleSecondCurrencyInputChange = (value: string) => {
        const exhangeValue = currencyExchange(
            Number(value),
            secondSelectedAccount.currency,
            firstSelectedAccount.currency,
        );
        setSecondCurrencyInputState({
            value: value,
            valueAsNumber: Number(value),
            exceedsBalance: secondInputExceedsBalance(exchangeAction, Number(value)),
        });
        setFirstCurrencyInputState({
            value: exhangeValue.toString(),
            valueAsNumber: exhangeValue,
            exceedsBalance: firstInputExceedsBalance(exchangeAction, exhangeValue),
        });
    };

    const getButtonText =
        exchangeAction === ExchangeAction.SELL
            ? `Sell ${firstSelectedAccount.currency.code} for ${secondSelectedAccount.currency.code}`
            : `Buy ${firstSelectedAccount.currency.code} with ${secondSelectedAccount.currency.code}`;

    const isButtonDisabled =
        firstCurrencyInputState.exceedsBalance ||
        secondCurrencyInputState.exceedsBalance ||
        firstCurrencyInputState.valueAsNumber === 0 ||
        secondCurrencyInputState.valueAsNumber === 0;

    return (
        <StyledCurrencyExchangeWidget>
            <ExchangeDescription data-testid="exchange-description">
                <h3>
                    {exchangeAction === ExchangeAction.SELL ? 'Sell ' : 'Buy '}
                    {firstSelectedAccount.currency.code}
                </h3>
            </ExchangeDescription>
            <ExchangeRate>
                <AiOutlineStock />
                <span data-testid="exchange-rate">{`${firstSelectedAccount.currency.symbol}1 = ${exchangeRate}${secondSelectedAccount.currency.symbol}`}</span>
            </ExchangeRate>
            <CurrencyExchangeInput
                availableAccounts={accounts}
                selectedAccount={firstSelectedAccount}
                onSelectAccount={(accountId: number) =>
                    onSelectAccount(
                        accountId,
                        firstSelectedAccount.id,
                        secondSelectedAccount.id,
                        setFirstSelectedAccount,
                    )
                }
                currencyInputValue={firstCurrencyInputState.value}
                exceedsBalance={firstCurrencyInputState.exceedsBalance}
                onCurrencyInputChange={handleFirstCurrencyInputChange}
            />
            <CashflowArrow
                data-testid="cashflow-arrow"
                $facingDownwards={!!(exchangeAction === ExchangeAction.SELL)}
                onClick={() =>
                    onCashflowArrowClick(
                        exchangeAction === ExchangeAction.SELL
                            ? ExchangeAction.BUY
                            : ExchangeAction.SELL,
                    )
                }
            />
            <CurrencyExchangeInput
                availableAccounts={accounts}
                selectedAccount={secondSelectedAccount}
                onSelectAccount={(accountId: number) =>
                    onSelectAccount(
                        accountId,
                        secondSelectedAccount.id,
                        firstSelectedAccount.id,
                        setSecondSelectedAccount,
                    )
                }
                currencyInputValue={secondCurrencyInputState.value}
                exceedsBalance={secondCurrencyInputState.exceedsBalance}
                onCurrencyInputChange={handleSecondCurrencyInputChange}
            />
            <Button type="submit" data-testid="exchange-button" disabled={isButtonDisabled}>
                <span>{getButtonText}</span>
            </Button>
        </StyledCurrencyExchangeWidget>
    );
};

export default CurrencyExchangeWidget;
