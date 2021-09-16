import { useState } from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Account } from '../../models/Account';
import { selectExchangeRateForCurrency } from '../../state/currency-rates/selectors';
import { setSelectedAccountsAndAmount } from '../../state/exchange/actions';
import { selectAvailableAccounts, selectChoosenAccounts } from '../../state/exchange/selectors';
import { State } from '../../state/state';
import { getExchangedValue } from '../../utils/exchange';
import Button from '../shared/button/Button';
import CurrencyExchangeInput from '../shared/currency-exchange-input/CurrencyExchangeInput';
import {
    CashflowArrow,
    ExchangeDescription,
    ExchangeRate,
    StyledCurrencyExchangeWidget,
} from './CurrencyExchangeWidget.styled';

enum ExchangeAction {
    SELL = 'sell',
    BUY = 'buy',
}
const defaultInputState = {
    value: '',
    exceedsBalance: false,
};

const CurrencyExchangeWidget: React.FC = () => {
    const dispatch = useDispatch();
    const [firstCurrencyInputState, setFirstCurrencyInputState] = useState(defaultInputState);
    const [secondCurrencyInputState, setSecondCurrencyInputState] = useState(defaultInputState);
    const [exchangeAction, setExchangeAction] = useState<ExchangeAction>(ExchangeAction.SELL);
    const { accounts, firstSelectedAccount, secondSelectedAccount, exchangeRate } = useSelector(
        (s) => {
            const { fromAccount, toAccount } = selectChoosenAccounts(s as State);
            return {
                accounts: selectAvailableAccounts(s as State),
                firstSelectedAccount: fromAccount,
                secondSelectedAccount: toAccount,
                exchangeRate: selectExchangeRateForCurrency(toAccount.currency.code, s as State),
            };
        },
    );

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

    const clearInputsStates = () => {
        setFirstCurrencyInputState(defaultInputState);
        setSecondCurrencyInputState(defaultInputState);
    };

    const onSelectFirstAccount = (newAccount: Account) => {
        if (newAccount.id === firstSelectedAccount.id) {
            return;
        }
        if (newAccount.id === secondSelectedAccount.id) {
            dispatch(setSelectedAccountsAndAmount(secondSelectedAccount, firstSelectedAccount, 0));
        } else {
            dispatch(setSelectedAccountsAndAmount(newAccount, secondSelectedAccount, 0));
        }
        clearInputsStates();
    };

    const onSelectSecondAccount = (newAccount: Account) => {
        if (newAccount.id === secondSelectedAccount.id) {
            return;
        }
        if (newAccount.id === firstSelectedAccount.id) {
            dispatch(setSelectedAccountsAndAmount(secondSelectedAccount, firstSelectedAccount, 0));
        } else {
            dispatch(setSelectedAccountsAndAmount(firstSelectedAccount, newAccount, 0));
        }
        clearInputsStates();
    };

    const onCashflowArrowClick = (newExchangeAction: ExchangeAction) => {
        setExchangeAction(newExchangeAction);
        setFirstCurrencyInputState((inputState) => ({
            ...inputState,
            exceedsBalance: firstInputExceedsBalance(newExchangeAction, Number(inputState)),
        }));
        setSecondCurrencyInputState((inputState) => ({
            ...inputState,
            exceedsBalance: secondInputExceedsBalance(newExchangeAction, Number(inputState)),
        }));
    };

    const handleFirstCurrencyInputChange = (value: string) => {
        const exhangeValue = getExchangedValue(Number(value), exchangeRate);
        setFirstCurrencyInputState({
            value: value,
            exceedsBalance: firstInputExceedsBalance(exchangeAction, Number(value)),
        });
        setSecondCurrencyInputState({
            value: exhangeValue.toString(),
            exceedsBalance: secondInputExceedsBalance(exchangeAction, exhangeValue),
        });
    };

    const handleSecondCurrencyInputChange = (value: string) => {
        const exhangeValue = getExchangedValue(Number(value), exchangeRate);
        setSecondCurrencyInputState({
            value: value,
            exceedsBalance: secondInputExceedsBalance(exchangeAction, Number(value)),
        });
        setFirstCurrencyInputState({
            value: exhangeValue.toString(),
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
        Number(firstCurrencyInputState.value) === 0 ||
        Number(secondCurrencyInputState.value) === 0;

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
                <span data-testid="exchange-rate">{`${firstSelectedAccount.currency.symbol}1 = ${
                    exchangeRate || '...'
                }${secondSelectedAccount.currency.symbol}`}</span>
            </ExchangeRate>
            <CurrencyExchangeInput
                availableAccounts={accounts}
                selectedAccount={firstSelectedAccount}
                onSelectAccount={onSelectFirstAccount}
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
                onSelectAccount={onSelectSecondAccount}
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
