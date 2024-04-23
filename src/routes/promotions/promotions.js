
const promotion_rules = [
    {
        rule : "Nx$",
        discount_percentage : 20,
        n : 4
    },
    {
        rule : "AyA",
        discount_percentage : 15,
        n : 1
    }
]
exports.addpromotion=ctx => {
    try {
        const { cart_id, items } = ctx.request.body;
        let total_cart_amount = 0;
        const details = items.map(item => {
            const { item_id, promotion, amount, unit_base_price } = item;
            if (amount <= 0 || unit_base_price <= 0) {
                throw 0;
            }
            let total_price = unit_base_price * amount;
            let promotion_applied = false;
            const rule = promotion_rules.find(r => r.rule === promotion);
            if (rule) {
                if (promotion === 'Nx$' && amount >= rule.n) {
                    total_price = total_price * (1 - rule.discount_percentage / 100);
                    promotion_applied = true;
                } else if (promotion === 'AyA') {
                    total_price = total_price * (1 - rule.discount_percentage / 100);
                    promotion_applied = true;
                }
            } else if (promotion!="" && promotion!='Nx$' && promotion!='AyA') {
                throw 1;
            }
            total_cart_amount += total_price;
            return {
                item_id,
                amount,
                total_price,
                promotion_applied
            };
        });
        ctx.status = 200;
        ctx.body = {
            status: 'OK',
            cart_id,
            total_cart_amount,
            details
        };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'NOK',
                error_message: 'INTERNAL SERVER ERROR'
            };
            if (error==0){
                ctx.status = 400;
                ctx.body = {
                    status: 'NOK',
                    error_message: 'AMOUNT OR PRICE SHOULD BE GREATER THAN ZERO'
                };
                return;
            }
            if (error==1){
                ctx.status = 400;
                ctx.body = {
                    status: 'NOK',
                    error_message: 'RULE DOES NOT EXIST'
                };
                return;
            }
        }
};