import { Context } from '../model/Context'
import FlowExecuter from './flow/FlowExecuter'
import FlowStrategy from './flow/FlowStrategy'
import AgreementSignStep from './flow/step/AgreementSignStep'
import CompleteCheckinStep from './flow/step/CompleteCheckinStep'
import PassportInformationStep from './flow/step/PassportInformationStep'
import ValidateSessionStep from './flow/step/ValidateSessionStep'
import ValidateVisaStep from './flow/step/ValidateVisaStep'

export default class CheckinFlow extends FlowStrategy {

  protected continueFlow(flowExecuter: FlowExecuter, context: Context): Promise<Context> {
    flowExecuter
      .and(new ValidateSessionStep())
      .and(new PassportInformationStep())
      .and(new ValidateVisaStep())
      .and(new AgreementSignStep())
      .and(new CompleteCheckinStep())

    return flowExecuter.execute(context)
  }

}
