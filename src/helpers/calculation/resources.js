const { ResourcesRegistry } = require('@database/registry/resources');

class CalculationResourcesService {

    static calculateFormula(formula, level, effiency) {
        if(!formula.isPercentage) {
            if(formula.formulaId === 1) {
                return effiency * formula.A * Math.pow(level + formula.B, formula.C) * Math.pow(Math.max(formula.D, 1), level);
            }
            if(formula.formulaId === 2) {
                return effiency * (formula.A + formula.B * level + formula.C * level * level);
            }
        } else {
            if(formula.formulaId === 1) {
                return Math.pow(1 + formula.A, level) - (1 - effiency)*(Math.pow(1 + formula.A, level) - 1);
            }
        }

    }

    static async calculateFormulaArray(formulas, level, effiency) {
        const amount = await CalculationResourcesService.fillEmptyAmounts();
        for(let formula of formulas) {
            const amountIndex = amount.findIndex(res => res.resourceCode === formula.resourceCode);
            if(amountIndex > 0) {
                amount[amountIndex].amount = CalculationResourcesService.calculateFormula(formula, level, effiency);
            }
        }
    }

    static async fillEmptyAmounts() {
        const res = await ResourcesRegistry.resourcesList();
        if(res) {
            return res.map(item => ({
                resourceCode: item.code,
                amount: 0,
                min: item.minQuantity,
                isStoreable: item.isStoreable,
                isPrimary: item.isPrimary,
                name: item.name,
            }));
        }
        return [];
    }

    static async fillFromArray(arr) {
        const res = await CalculationResourcesService.fillEmptyAmounts();
        return res.map(item => ({
            ...item,
            amount: arr.find(el => el.resourceCode === item.resourceCode)
            ? +arr.find(el => el.resourceCode === item.resourceCode).amount : +item.amount,
        })
        );
    }

    static async fillEmptyBonuses() {
        const res = await ResourcesRegistry.resourcesList();
        if(res) {
            return res.map(item => ({resourceCode: item.code, amount: 1.0, min: item.minQuantity, isStoreable: item.isStoreable}));
        }
        return [];
    }

    static async modifyResources(original, add) {
        const result = await CalculationResourcesService.fillEmptyAmounts();
        for(let originalItem of original) {
            const i = result.findIndex(item => item.resourceCode === originalItem.resourceCode);
            if(i > -1) {
                result[i].amount += +originalItem.amount;
                if(Math.abs(result[i].amount) < 1.e-08 ) {
                    result[i].amount = 0;
                }
            }
        }
        for(let addItem of add) {
            const i = result.findIndex(item => item.resourceCode === addItem.resourceCode);
            if (i > -1) {
                if(result[i].isStoreable) {
                    result[i].amount += +addItem.amount;
                    if(Math.abs(result[i].amount) < 1.e-08 ) {
                        result[i].amount = 0;
                    }
                } else {
                    result[i].amount = addItem.amount;
                    if(Math.abs(result[i].amount) < 1.e-08 ) {
                        result[i].amount = 0;
                    }
                }
            }
        }
        return result;

    }

    static async subtractResources(original, add) {
        const result = await CalculationResourcesService.fillEmptyAmounts();
        for(let originalItem of original) {
            const i = result.findIndex(item => item.resourceCode === originalItem.resourceCode);
            if(i > -1) {
                result[i].amount += +originalItem.amount;
                if(Math.abs(result[i].amount) < 1.e-08 ) {
                    result[i].amount = 0;
                }
            }
        }
        for(let addItem of add) {
            const i = result.findIndex(item => item.resourceCode === addItem.resourceCode);
            if (i > -1) {
                if(result[i].isStoreable) {
                    result[i].amount -= +addItem.amount;
                    //result[i].originalAmount = result[i].amount;
                    //result[i].amount = Math.max(result[i].amount, result[i].min);
                    if(Math.abs(result[i].amount) < 1.e-08 ) {
                        result[i].amount = 0;
                    }
                } else {
                    result[i].amount = addItem.amount;
                    if(Math.abs(result[i].amount) < 1.e-08 ) {
                        result[i].amount = 0;
                    }
                }

            }
        }
        return result;

    }

    static async isEnought(amount) {
        const result = await CalculationResourcesService.fillEmptyAmounts();
        for(let originalItem of amount) {
            const i = result.findIndex(item => item.resourceCode === originalItem.resourceCode);
            if(i > -1) {
                result[i].amount = +originalItem.amount;
            }
        }
        for(let item of result) {
            if('min' in item && item.min > item.amount) {
                console.log('NOTENOUGHT: ', item);
                return false;
            }
        }
        return true;

    }

    static async multiplyResources(original, mult, bCheckStorability) {
        const result = await CalculationResourcesService.fillEmptyAmounts();
        for(let originalItem of original) {
            const i = result.findIndex(item => item.resourceCode === originalItem.resourceCode);
            if(i > -1) {
                if(bCheckStorability && !result[i].isStoreable) {
                    result[i].amount = originalItem.amount;
                } else {
                    result[i].amount = originalItem.amount * mult;
                }

            }
        }
        return result;

    }

    static async cutResources(original, cap, bCheckStorability) {
        const result = await CalculationResourcesService.fillEmptyAmounts();
        for(let originalItem of original) {
            const i = result.findIndex(item => item.resourceCode === originalItem.resourceCode);
            if(i > -1) {
                result[i].amount += originalItem.amount;
            }
        }
        for(let addItem of cap) {
            const i = result.findIndex(item => item.resourceCode === addItem.resourceCode);
            if (i > -1 && (!bCheckStorability || result[i].isStoreable)) {
                result[i].amount = Math.min(addItem.amount, result[i].amount);
            }
        }
        return result;
    }

    static async newAmount({production, capacity, previousAmount, dT}) {
        const amounts = await CalculationResourcesService.fillFromArray(previousAmount);
        const dRes = await CalculationResourcesService.multiplyResources(production, dT / (3600 * 1000), true);
        const modified = await CalculationResourcesService
            .modifyResources(amounts, dRes);
        const newRes = await CalculationResourcesService
            .cutResources(
                modified,
                capacity,
                true
            );
        return newRes;
    }

}

module.exports = {
    CalculationResourcesService,
}
