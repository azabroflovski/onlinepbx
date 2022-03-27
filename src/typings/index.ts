/*
|--------------------------------------------------------------------------
| Common
|--------------------------------------------------------------------------
| List of common definitions
*/

export interface Settings {
    apiKey: string
    domain: string
    autoConnect?: boolean
    socket?: {
        protocol?: string
        port?: string | number
    }
}

export interface Socket {
    emit(event: EventName | CommandName, data: any): void
    $emit: any
}

export interface SocketConnection {
    domain: string
    key: string
}

export interface Command {
    name: EventName | CommandName
    data: any
    callback: void
}

export type HangupCause =
    'UNSPECIFIED'|
    'UNALLOCATED_NUMBER' |
    'NO_ROUTE_TRANSIT_NET' |
    'NO_ROUTE_DESTINATION' |
    'CHANNEL_UNACCEPTABLE' |
    'CALL_AWARDED_DELIVERED' |
    'NORMAL_CLEARING' |
    'USER_BUSY' |
    'NO_USER_RESPONSE' |
    'NO_ANSWER' |
    'SUBSCRIBER_ABSENT' |
    'CALL_REJECTED' |
    'NUMBER_CHANGED' |
    'REDIRECTION_TO_NEW_DESTINATION' |
    'EXCHANGE_ROUTING_ERROR' |
    'DESTINATION_OUT_OF_ORDER' |
    'INVALID_NUMBER_FORMAT' |
    'FACILITY_REJECTED' |
    'RESPONSE_TO_STATUS_ENQUIRY' |
    'NORMAL_UNSPECIFIED' |
    'NORMAL_CIRCUIT_CONGESTION' |
    'NETWORK_OUT_OF_ORDER' |
    'NORMAL_TEMPORARY_FAILURE' |
    'SWITCH_CONGESTION' |
    'ACCESS_INFO_DISCARDED' |
    'REQUESTED_CHAN_UNAVAIL' |
    'PRE_EMPTED' |
    'FACILITY_NOT_SUBSCRIBED' |
    'OUTGOING_CALL_BARRED' |
    'INCOMING_CALL_BARRED' |
    'BEARERCAPABILITY_NOTAUTH' |
    'BEARERCAPABILITY_NOTAVAIL' |
    'BEARERCAPABILITY_NOTIMPL' |
    'SERVICE_UNAVAILABLE' |
    'CHAN_NOT_IMPLEMENTED' |
    'FACILITY_NOT_IMPLEMENTED' |
    'SERVICE_NOT_IMPLEMENTED' |
    'INVALID_CALL_REFERENCE' |
    'INCOMPATIBLE_DESTINATION' |
    'INVALID_MSG_UNSPECIFIED' |
    'MANDATORY_IE_MISSING' |
    'MESSAGE_TYPE_NONEXIST' |
    'WRONG_MESSAGE' |
    'IE_NONEXIST' |
    'INVALID_IE_CONTENTS' |
    'WRONG_CALL_STATE' |
    'RECOVERY_ON_TIMER_EXPIRE' |
    'MANDATORY_IE_LENGTH_ERROR' |
    'PROTOCOL_ERROR' |
    'INTERWORKING' |
    'ORIGINATOR_CANCEL' |
    'CRASH' |
    'SYSTEM_SHUTDOWN' |
    'LOSE_RACE' |
    'MANAGER_REQUEST' |
    'BLIND_TRANSFER' |
    'ATTENDED_TRANSFER' |
    'ALLOTTED_TIMEOUT' |
    'USER_CHALLENGE' |
    'MEDIA_TIMEOUT' |
    'PICKED_OFF' |
    'USER_NOT_REGISTERED' |
    'PROGRESS_TIMEOUT'




/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
| List of available commands definitions
|
*/

export type CommandName =
    'makeCall' |
    'transfer' |
    'bridge' |
    'eavesdrop' |
    'hangup_call' |
    'subscribe' |
    'rebootPhone' |
    'sipMessage' |
    'flushReg' |
    'trunkList' |
    'userList' |
    'message'

export interface MakeCall {
    from: string
    to: string
    fromOrigNumber?: string
    fromOrigName?: string
    domainTo?: string
    fromName?: string
    gateFrom?: string
    gateTo?: string
}

export interface Transfer {
    uuid: string
    to: string
    gateTo?: string
    domainTo?: string
}

export interface Bridge {
    uuid: string
    toUuid: string
}

export interface EavesDrop {
    uuid: string
    from: string
    gateFrom?: string
}

export interface HangupCall {
    uuid: string
}

export interface Subscribe {
    events: {
        calls: boolean
        blf: boolean
        messages: boolean
        callback: boolean
        api: boolean
        registration: boolean
    }
}

export interface RebootPhone {
    num: string
    model: string
}

export interface ReloadGW {
    num: string
}

export interface SipMessage {
    num: string
    text: string
}

export interface FlushReg {
    num: string
}

export interface Message {
    data: string
    target?: string
}





/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
| List of available events definitions
|
*/

export type EventName =
    'connect' |
    'blf' |
    'registration' |
    'channelCreate' |
    'channelDestroy' |
    'channelAnswer' |
    'channelBridge' |
    'channelApplication' |
    'channelHold' |
    'channelUnhold'

export interface OnBlf {
    uid: string
    status: string
    direction: string
    rank: string
    otherLeg: string
    uuid: string
    timestamp: string
}

export interface OnRegistration {
    uid: string
    agent: string
    state: string
    ip: string
    port: string
    expires: string
}

export interface OnChannelCreate {
    uuid: string
    direction: string
    createdStamp: number
    state: string
    endpoint: string
    domain: string
    callerNumber: string
    callerName: string
    destinationNumber: string
    destinationHost: string
    gate: string
    diversion: string
}

export interface OnChannelDestroy {
    uuid: string
    direction: string
    createdStamp: number
    state: string
    endpoint: string
    hangupCause: HangupCause
}

export interface OnChannelBridge {
    direction: string
    alegUuid: string
    blegUuid: string
}

export interface OnChannelApplication {
    uuid: string
    application: string
    applicationData: object
}

export interface OnChannelHold {
    direction: string
    uuid: string
    createdStamp: number
    domain: string
    callerNumber: string
    callerName: string
    destinationNumber: string
}

export interface OnChannelUnHold {
    direction: string
    uuid: string
    createdStamp: number
    domain: string
    callerNumber: string
    callerName: string
    destinationNumber: string
}
