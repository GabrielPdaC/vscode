/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { URI } from '../../../../../../base/common/uri.js';
import { assert } from '../../../../../../base/common/assert.js';
import { IDynamicVariable } from '../../../common/chatVariables.js';
import { IRange } from '../../../../../../editor/common/core/range.js';
import { ILogService } from '../../../../../../platform/log/common/log.js';
import { PromptFileReference } from '../../../common/promptFileReference.js';
import { IFileService } from '../../../../../../platform/files/common/files.js';
import { IConfigurationService } from '../../../../../../platform/configuration/common/configuration.js';

/**
 * A wrapper class for an `IDynamicVariable` object that that adds functionality
 * to parse nested file references of this variable.
 * See {@link PromptFileReference} for details.
 */
export class ChatFileReference extends PromptFileReference implements IDynamicVariable {
	/**
	 * @throws if the `data` reference is no an instance of `URI`.
	 */
	constructor(
		public readonly reference: IDynamicVariable,
		@ILogService logService: ILogService,
		@IFileService fileService: IFileService,
		@IConfigurationService configService: IConfigurationService,
	) {
		const { data } = reference;

		assert(
			data instanceof URI,
			`Variable data must be an URI, got '${data}'.`,
		);

		super(data, logService, fileService, configService);
	}

	/**
	 * Note! below are the getters that simply forward to the underlying `IDynamicVariable` object;
	 * 		 while we could implement the logic generically using the `Proxy` class here, it's hard
	 * 		 to make Typescript to recognize this generic implementation correctly
	 */

	public get id() {
		return this.reference.id;
	}

	public get range() {
		return this.reference.range;
	}

	public set range(range: IRange) {
		this.reference.range = range;
	}

	public get data(): URI {
		return this.uri;
	}

	public get prefix() {
		return this.reference.prefix;
	}

	public get isFile() {
		return this.reference.isFile;
	}

	public get fullName() {
		return this.reference.fullName;
	}

	public get icon() {
		return this.reference.icon;
	}

	public get modelDescription() {
		return this.reference.modelDescription;
	}
}